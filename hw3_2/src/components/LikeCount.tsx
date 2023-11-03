'use client';

import { useState } from 'react';
import type { EventHandler, MouseEvent } from 'react';

import useLike from '@/hooks/useLike';
import { cn } from '@/lib/utils';

type LikeCountProps = {
  initialLikes: number;
};

export default function LikeCount({ initialLikes }: LikeCountProps) {
  const [likesCount, setLikesCount] = useState(initialLikes);
  const { likeTweet, unlikeTweet, loading } = useLike();

  return (
    <>
      <div>{`參加人數：${likesCount}`}</div>
    </>
  );
}
