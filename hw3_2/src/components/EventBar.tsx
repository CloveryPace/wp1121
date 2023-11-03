'use client';

import { useRef, useState } from 'react';

import { ChevronDown, Search } from 'lucide-react';

import GrowingTextarea from '@/components/GrowingTextarea';
import UserAvatar from '@/components/UserAvatar';
import { Separator } from '@/components/ui/separator';
import useTweet from '@/hooks/useTweet';
import useUserInfo from '@/hooks/useUserInfo';
import { cn } from '@/lib/utils';

import { NewEventDialog } from './NewEventDialog';

export default function EventBar() {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { postTweet, loading } = useTweet();
  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    if (!content) return;
    if (!handle) return;

    try {
      await postTweet({
        handle,
        content,
      });

      // textareaRef.current.value = '';

      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      // new一個event
      textareaRef.current.dispatchEvent(
        new Event('input', { bubbles: true, composed: true }),
      );
    } catch (e) {
      console.error(e);
      alert('Error creating event');
    }
  };

  const handleOpenNewEventDialog = () => {
    setNewEventDialogOpen(true);
  };
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
