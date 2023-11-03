import Link from 'next/link';

type EventProps = {
  handle?: string;
  id: number;
  title: string;
  joins: number;
  createdAt: Date;
  joined?: boolean;
};

const Event = ({ handle, id, title, joins, createdAt, joined }: EventProps) => {
  return (
    <Link href={{ pathname: `/event/${id}` }}>
      <div>Event</div>
    </Link>
  );
};

export default Event;
