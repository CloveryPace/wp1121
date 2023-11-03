// EventSearchBar + a button
import React from 'react';

import EventSearchBar from './EventSearchBar';
import { Button } from './ui/button';

const EventBar = () => {
  return (
    <>
      <EventSearchBar></EventSearchBar>
      <Button className="px-3 py-2">新增</Button>
    </>
  );
};

export default EventBar;
