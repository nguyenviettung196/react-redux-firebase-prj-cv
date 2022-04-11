import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, GridColumn } from 'semantic-ui-react';
import { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToEvents } from '../eventActions';
import EventList from '../eventList/EventList';
import EventFilter from './EventFilter';
import EventListItemPlaceholder from './EventListItemPlaceholder';

const EventDashboard = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector(state => state.async);

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: events => dispatch(listenToEvents(events)),
    deps: [dispatch]
  });

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
