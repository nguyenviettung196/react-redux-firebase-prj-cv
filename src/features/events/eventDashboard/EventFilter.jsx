import React from 'react';
import { Calendar } from 'react-calendar';
import { Header, Menu, MenuItem } from 'semantic-ui-react';

const EventFilter = ({ predicate, setPredicate, loading }) => {
  return <div>
    <Menu vertical size='large' style={{ width: '100%' }}>
      <Header icon={`filter`} attached color='teal' content='Filters' />
      <MenuItem
        content='All Events'
        active={predicate.get('filter') === 'all'}
        onClick={() => setPredicate('filter', 'all')}
        disabled={loading}
      />
      <MenuItem
        content="I'm going"
        active={predicate.get('filter') === 'isGoing'}
        onClick={() => setPredicate('filter', 'isGoing')}
        disabled={loading}
      />
      <MenuItem
        content="I'm hosting"
        active={predicate.get('filter') === 'isHost'}
        onClick={() => setPredicate('filter', 'isHost')}
        disabled={loading}
      />
    </Menu>
    <Header icon={`calendar`} attached color='teal' content="Select date" />
    <Calendar
      onChange={date => setPredicate('startDate', date)}
      value={predicate.get('startDate') || new Date()}
      tileDisabled={() => loading}
    />
  </div>;
};

export default EventFilter;;
