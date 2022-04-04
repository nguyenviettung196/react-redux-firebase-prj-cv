import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridColumn } from 'semantic-ui-react';
import EventList from '../eventList/EventList';

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events} />
      </GridColumn>
      <GridColumn width={6}>
        <h2>Event filter</h2>
      </GridColumn>
    </Grid>
  );
};

export default EventDashboard;
