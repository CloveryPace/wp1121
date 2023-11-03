import Image from 'next/image';
import Link from 'next/link';

import { Check } from 'lucide-react';

// import joined from 'joined.png';
import joined from '@/assets/checked.png';
import { Separator } from '@/components/ui/separator';
import { getAvatar } from '@/lib/utils';

import LikeButton from './LikeButton';
import LikeCount from './LikeCount';
import TimeText from './TimeText';

type TweetProps = {
  username?: string;
  handle?: string;
  id: number;
  authorName: string;
  authorHandle: string;
  content: string;
  likes: number;
  createdAt: Date;
  liked?: boolean;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Tweet({
  username,
  handle,
  id,
  authorName,
  authorHandle,
  content,
  likes,
  createdAt,
  liked,
}: TweetProps) {
  return (
    <>
      <Link
        className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: `/tweet/${id}`,
          query: {
            username,
            handle,
          },
        }}
      >
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* {liked && (
            <Image src={joined} alt={'Joined'} width={48} height={48}></Image>
          )} */}
          {liked && <Check stroke="green" />}
          <article className="flex grow flex-col">
            <p className="font-bold">
              {authorName}
              <span className="ml-2 font-normal text-gray-400">
                @{authorHandle}
              </span>
              <time className="ml-2 font-normal text-gray-400">
                <TimeText date={createdAt} format="h:mm A · D MMM YYYY" />
              </time>
            </p>
            {/* `white-space: pre-wrap` tells html to render \n and \t chracters  */}
            <article className="mt-2 whitespace-pre-wrap">{content}</article>
            <div className="my-2 flex items-center justify-between gap-4 text-gray-400">
              {/* <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
                <MessageCircle size={20} className="-scale-x-100" />
              </button> */}
              {/* <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
                <Repeat2 size={22} />
              </button> */}
              <LikeButton
                initialLikes={likes}
                initialLiked={liked}
                tweetId={id}
                handle={handle}
              />
              {/* <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
                <Share size={18} />
              </button> */}
              <LikeCount initialLikes={likes}></LikeCount>
            </div>
          </article>
        </div>
      </Link>
      <Separator />
    </>
  );
}
