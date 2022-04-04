import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Icon,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  List,
  Segment,
  SegmentGroup
} from 'semantic-ui-react';
import { deleteEvent } from '../eventActions';
import EventListAttendee from './EventListAttendee';
import { format } from 'date-fns';

const EventListItem = ({ event }) => {
  const dispatch = useDispatch();
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <ItemContent>
              <ItemHeader content={event.title} />
              <ItemDescription>Hosted by {event.hostedBy}</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(event.date,'MMMM d, yyyy h:mm a')}
          <Icon name="marker" style={{ marginLeft: '5px' }} />
          {event.venue}
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
          onClick={() => dispatch(deleteEvent(event.id))}
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
