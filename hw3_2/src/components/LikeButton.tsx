'use client';

import { useState } from 'react';
import type { EventHandler, MouseEvent } from 'react';

import { Heart } from 'lucide-react';

import useLike from '@/hooks/useLike';
import { cn } from '@/lib/utils';

type LikeButtonProps = {
  initialLikes: number;
  initialLiked?: boolean;
  tweetId: number;
  handle?: string;
};

export default function LikeButton({
  initialLikes,
  initialLiked,
  tweetId,
  handle,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const { likeTweet, unlikeTweet, loading } = useLike();

  const handleClick: EventHandler<MouseEvent> = async (e) => {
    // since the parent node of the button is a Link, when we click on the
    // button, the Link will also be clicked, which will cause the page to
    // navigate to the tweet page, which is not what we want. So we stop the
    // event propagation and prevent the default behavior of the event.
    e.stopPropagation(); // 不要再把event往下傳播
    e.preventDefault();
    if (!handle) return;
    if (liked) {
      await unlikeTweet({
        tweetId,
        userHandle: handle,
      });
      setLikesCount((prev) => prev - 1);
      setLiked(false);
    } else {
      await likeTweet({
        tweetId,
        userHandle: handle,
      });
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <button
      className={cn(
        'flex w-full items-center gap-1 hover:border-2 hover:border-solid hover:border-sky-500 hover:text-brand',
        liked && 'text-brand',
      )}
      onClick={handleClick}
      disabled={loading}
    >
      <div>{liked ? '你已參加' : '我想參加'}</div>
      {likesCount}
    </button>
  );
}
