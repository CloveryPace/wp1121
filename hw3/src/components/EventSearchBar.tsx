import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EventSearchBar() {
  return (
    <div className="flex space-x-2">
      <Input type="text" className="w-80 px-3 py-2" placeholder="Search..." />
      <Button className="px-3 py-2">Search</Button>
    </div>
  );
}
