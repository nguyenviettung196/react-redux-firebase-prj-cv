import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridColumn } from 'semantic-ui-react';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

const EventDetaildPage = ({ match }) => {
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  return (
    <Grid>
      <GridColumn width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </GridColumn>
      <GridColumn width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </GridColumn>
    </Grid>
  );
};

export default EventDetaildPage;
