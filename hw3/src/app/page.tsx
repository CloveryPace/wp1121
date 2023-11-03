import EventBar from '@/components/EventBar';
import EventSearchBar from '@/components/EventSearchBar';
import UserBar from '@/components/UserBar';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <UserBar></UserBar>
      <Separator></Separator>
      <EventBar></EventBar>
      <Separator></Separator>
      {/* {Events} */}
    </>
  );
}
