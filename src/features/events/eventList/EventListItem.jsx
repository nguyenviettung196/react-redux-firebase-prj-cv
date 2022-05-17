import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Icon,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  Label,
  List,
  Segment,
  SegmentGroup
} from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { format } from 'date-fns';
import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';

const EventListItem = ({ event }) => {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <ItemContent>
              <ItemHeader content={event.title} />
              <ItemDescription>Hosted by <Link to={`/profile/${ event.hostUid }`}>{event.hostedBy}</Link></ItemDescription>
              {event.isCancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon='right'
                  color='red'
                  content='This event has been cancelled'
                />
              )}
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(event.date, 'MMMM d, yyyy h:mm a')}
          <Icon name="marker" style={{ marginLeft: '5px' }} />
          {event.venue.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{event.description}</span>{' '}
        <Button
          onClick={() => deleteEventInFirestore(event.id)}
          color="red"
          floated="right"
          content="Delete"
        />
        <Button
          as={Link}
          to={`/events/${ event.id }`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </SegmentGroup>
  );
};

export default EventListItem;
