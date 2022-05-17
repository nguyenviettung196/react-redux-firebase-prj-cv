import React, { useState } from 'react';
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
  const [predicate, setPredicate] = useState(new Map([
    ['startDate', new Date()],
    ['filter', 'all']
  ]));

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: events => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate]
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
        <EventFilter predicate={predicate} setPredicate={handleSetPredicate} loading={loading} />
      </GridColumn>
    </Grid>
  );
};

export default EventDashboard;
