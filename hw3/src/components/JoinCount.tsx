'use client';

type LikeCountProps = {
  initialLikes: number;
};

export default function JoinCount({ initialLikes }: LikeCountProps) {
  return (
    <>
      <div>{`參加人數：${initialLikes}`}</div>
    </>
  );
}
