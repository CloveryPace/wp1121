'use client';

import { useRef } from 'react';

import { Search } from 'lucide-react';

import GrowingTextarea from '@/components/GrowingTextarea';

import { NewEventDialog } from './NewEventDialog';

export default function EventBar() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    // input的任何地方onclick都會讓游標focus在textarea
    <div
      className="flex-col gap-4"
      onClick={() => textareaRef.current?.focus()}
    >
      {/* <UserAvatar className="h-12 w-12" /> */}
      <div className="flex w-full flex-col px-2">
        {/* <button className="flex w-fit items-center rounded-full border-[1px] border-gray-300 px-2 text-sm font-bold text-brand">
          Everyone
          <ChevronDown size={16} className="text-gray-300" />
        </button> */}
        <div className="mb-2 mt-6 flex">
          <GrowingTextarea
            ref={textareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="搜尋活動"
          />
          <Search></Search>
        </div>
        <NewEventDialog></NewEventDialog>
      </div>
    </div>
  );
}
