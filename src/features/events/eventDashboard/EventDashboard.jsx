import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridColumn } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventList from '../eventList/EventList';
import EventFilter from './EventFilter';
import EventListItemPlaceholder from './EventListItemPlaceholder';

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector(state => state.async);



  return (
    <Grid>
      <GridColumn width={10}>
        {loading &&
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        }
        <EventList events={events} />
      </GridColumn>
      <GridColumn width={6}>
        <EventFilter />
      </GridColumn>
    </Grid>
  );
};

export default EventDashboard;
