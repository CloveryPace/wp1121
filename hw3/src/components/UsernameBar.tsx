'use client';

import { useRef } from 'react';

import GrowingTextarea from '@/components/GrowingTextarea';
import useUserInfo from '@/hooks/useUserInfo';
import { cn } from '@/lib/utils';

export default function UsernameBar() {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    if (!content) return;
    if (!handle) return;

    // try {
    //   await postTweet({
    //     handle,
    //     content,
    //   });

    //   // textareaRef.current.value = '';

    //   // this triggers the onInput event on the growing textarea
    //   // thus triggering the resize
    //   // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
    //   // new一個event
    //   textareaRef.current.dispatchEvent(
    //     new Event('input', { bubbles: true, composed: true }),
    //   );
    // } catch (e) {
    //   console.error(e);
    //   alert('Error creating event!');
    // }
  };

  return (
    // input的任何地方onclick都會讓游標focus在textarea
    <div
      className="flex-col gap-4"
      onClick={() => textareaRef.current?.focus()}
    >
      <h1>{`使用者名稱：${handle}`}</h1>
      {/* <UserAvatar className="h-12 w-12" /> */}
      <div className="flex w-full flex-col px-2">
        {/* <button className="flex w-fit items-center rounded-full border-[1px] border-gray-300 px-2 text-sm font-bold text-brand">
          Everyone
          <ChevronDown size={16} className="text-gray-300" />
        </button> */}
        <div className="mb-2 mt-6">
          <GrowingTextarea
            ref={textareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="輸入使用者名稱"
            // value={handle}
          />
        </div>
        <button
          className={cn(
            'my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70',
            'disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40',
          )}
          onClick={handleTweet}
        >
          修改名稱
        </button>
      </div>
    </div>
  );
}
