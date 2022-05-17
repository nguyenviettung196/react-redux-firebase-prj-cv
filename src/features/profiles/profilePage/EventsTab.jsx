import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardGroup, CardHeader, CardMeta, Grid, GridColumn, Header, Image, Tab, TabPane } from 'semantic-ui-react';
import { getUserEventsQuery } from '../../../app/firestore/firestoreService';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToUserEvents } from '../profileActions';
import { format } from 'date-fns';

const EventsTab = ({ profile }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const { profileEvents } = useSelector(state => state.profile);
  const { loading } = useSelector(state => state.async);

  useFirestoreCollection({
    query: () => getUserEventsQuery(activeTab, profile.id),
    data: events => dispatch(listenToUserEvents(events)),
    deps: [dispatch, activeTab, profile.id]
  });

  const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } },

  ];
  return (
    <TabPane loading={loading}>
      <Grid>
        <GridColumn width={16}>
          <Header floated='left' icon='calendar' content={`Events`} />

        </GridColumn>
        <GridColumn width={16}>
          <Tab
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <CardGroup itemsPerRow={5} style={{ marginTop: 10 }}>
            {profileEvents.map(event => (
              <Card as={Link} to={`/events/${ event.id }`} key={event.id}>
                <Image src={`/assets/categoryImages/${ event.category }.jpg`} style={{ minHeight: 100, objectFit: 'cover' }} />
                <Card.Content>
                  <CardHeader content={event.title} textAlign='center' />
                  <CardMeta textAlign='center'>
                    <div>{format(event.date, 'dd MMM yyyy')}</div>
                    <div>{format(event.date, 'hh:mm a')}</div>

                  </CardMeta>
                </Card.Content>
              </Card>
            ))}

          </CardGroup>
        </GridColumn>
      </Grid>
    </TabPane>
  );
};

export default EventsTab;