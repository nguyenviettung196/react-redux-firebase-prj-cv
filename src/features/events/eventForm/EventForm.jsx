import cuid from 'cuid';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Confirm, Header, Segment } from 'semantic-ui-react';
import { listenToEvents } from '../eventActions';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { addEventToFirestore, cancelEventToggle, listenToEventFromFirestore, updateEventInFirestore } from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const { loading, error } = useSelector(state => state.async);

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

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,//boolean
    query: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch]
  });

  if (loading) return <LoadingComponent content='Loading event...' />;

  if (error) return <Redirect to={`/error`} />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push('/events');
          } catch (error) {
            console.log(error);
            toast.error(error.message);
            setSubmitting(false);
          }

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
            {selectedEvent &&
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? 'green' : 'red'}
                content={selectedEvent.isCancelled ? 'Reactive Event' : 'Cancel Event'}
                onClick={() => setConfirmOpen(true)}
              />
            }
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
      <Confirm
        content={selectedEvent?.isCancelled ? 'This will reactive the event -  are you sure ?' : 'This will cancel the event - are you sure ?'}
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />

    </Segment>
  );
};

export default EventForm;
