'use client';

import { useState } from 'react';

import useLike from '@/hooks/useLike';

type LikeCountProps = {
  initialLikes: number;
};

export default function JoinCount({ initialLikes }: LikeCountProps) {
  const [joinsCount, setJoinsCount] = useState(initialLikes);

  return (
    <>
      <div>{`參加人數：${joinsCount}`}</div>
    </>
  );
}
