'use client';

import { useRef } from 'react';

import { Separator } from '@radix-ui/react-separator';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import GrowingTextarea from './GrowingTextarea';

const UserBar = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeName = () => {
    console.log(textareaRef.current?.value);
  };
  return (
    // input的任何地方onclick都會讓游標focus在textarea
    <div className="flex gap-4" onClick={() => textareaRef.current?.focus()}>
      <div className="flex w-full px-2">
        <div className="mb-2 mt-6">
          <GrowingTextarea
            ref={textareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="輸入使用者名稱"
          />
        </div>
        <button
          className={cn(
            'bg-brand hover:bg-brand/70 my-2 rounded-full px-4 py-2 transition-colors',
            'disabled:bg-brand/40 disabled:hover:bg-brand/40 disabled:cursor-not-allowed',
          )}
          onClick={handleChangeName}
          // disabled={loading} // 防止double click
        >
          修改名稱
        </button>
      </div>
    </div>
  );
};

export default UserBar;
