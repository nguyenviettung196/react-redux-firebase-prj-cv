import React from 'react';
import { Calendar } from 'react-calendar';
import { Header, Menu, MenuItem } from 'semantic-ui-react';

const EventFilter = () => {
  return <div>
    <Menu vertical size='large' style={{ width: '100%' }}>
      <Header icon={`filter`} attached color='teal' content='Filters' />
      <MenuItem content='All Events' />
      <MenuItem content="I'm going" />
      <MenuItem content="I'm hosting" />
    </Menu>
    <Header icon={`calendar`} attached color='teal' content="Select date" />
    <Calendar />
  </div>;
};

export default EventFilter;;
