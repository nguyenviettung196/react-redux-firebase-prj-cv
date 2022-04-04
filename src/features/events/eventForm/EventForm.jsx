import cuid from 'cuid';
import { Formik, Form } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    // ?? is null conditional operator
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required()
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(
              updateEvent({
                ...selectedEvent,
                ...values
              })
            )
            : dispatch(
              createEvent({
                ...values,
                id: cuid(),
                hostedBy: 'Tung',
                attendees: [],
                hostPhotoURL: '/assets/user.png'
              })
            );
          history.push('/events');
        }}>
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header color="teal" content="Event Details" />
            <MyTextInput label={`Title`} name="title" placeholder="Event title" />
            <MySelectInput
              label={`Category`}
              name="category"
              placeholder="Category"
              options={categoryData}
            />
            <MyTextArea
              label={`Description`}
              name="description"
              placeholder="Description"
              rows={3}
            />
            <Header color="teal" content="Event Location" />
            <MyTextInput label={`City`} name="city" placeholder="City" />
            <MyTextInput label={`Venue`} name="venue" placeholder="Venue" />
            <MyDateInput
              label={`Date`}
              name="date"
              placeholder="Event Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
              autoComplete="off"
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || isSubmitting || !dirty}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              as={Link}
              to="/events"
              type="button"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}

      </Formik>
    </Segment>
  );
};

export default EventForm;
