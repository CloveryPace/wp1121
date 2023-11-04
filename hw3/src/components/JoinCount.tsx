'use client';

import { useState } from 'react';
import type { EventHandler, MouseEvent } from 'react';

import useLike from '@/hooks/useLike';
import { cn } from '@/lib/utils';

type LikeCountProps = {
  initialLikes: number;
};

export default function JoinCount({ initialLikes }: LikeCountProps) {
  const [joinsCount, setJoinsCount] = useState(initialLikes);
  const { likeTweet, unlikeTweet, loading } = useLike();

  return (
    <>
      <div>{`參加人數：${joinsCount}`}</div>
    </>
  );
}
