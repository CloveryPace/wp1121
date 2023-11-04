'use client';

import { useRef, useState } from 'react';

import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTweet from '@/hooks/useTweet';
import useUserInfo from '@/hooks/useUserInfo';
import { cn } from '@/lib/utils';

import { DatePickerWithRange } from './ui/dateRangePicker';

export function NewEventDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { handle } = useUserInfo();
  const inputRef = useRef<HTMLInputElement>(null);
  const { postTweet } = useTweet();

  const handleCreateNewEvent = async () => {
    const content = inputRef.current?.value;
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
      // inputRef.current.dispatchEvent(
      //   new Event('input', { bubbles: true, composed: true }),
      // );
    } catch (e) {
      console.error(e);
      alert('Error creating event!');
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <button
          className={cn(
            'my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70',
            'disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40',
          )}
          // disabled={loading} // 防止double click
        >
          新增活動（開啟modal）
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增活動</DialogTitle>
          <DialogDescription>請輸入欲新增的活動資訊</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              活動名稱
            </Label>
            <Input
              id="title"
              defaultValue=""
              className="col-span-3"
              ref={inputRef}
            />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">開始日期</Label>
            <DatePicker></DatePicker>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">結束日期</Label>
            <DatePicker></DatePicker>
          </div> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">活動日期</Label>
            <DatePickerWithRange></DatePickerWithRange>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleCreateNewEvent} type="submit">
              確定新增
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
