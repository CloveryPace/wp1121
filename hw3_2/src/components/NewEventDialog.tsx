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
import { cn } from '@/lib/utils';

import { DatePicker } from './ui/datePicker';
import { DatePickerWithRange } from './ui/dateRangePicker';

export function NewEventDialog() {
  return (
    <Dialog>
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
            <Input id="title" defaultValue="" className="col-span-3" />
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
          <Button type="submit">確定新增</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
