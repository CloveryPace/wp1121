import Link from 'next/link';
import { redirect } from 'next/navigation';

import { eq, desc, sql, and } from 'drizzle-orm';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';

import Event from '@/components/Event';
import JoinButton from '@/components/JoinButton';
import ReplyInput from '@/components/ReplyInput';
import TimeText from '@/components/TimeText';
import { Separator } from '@/components/ui/separator';
import { db } from '@/db';
import { joinsTable, eventsTable, usersTable } from '@/db/schema';
import { getAvatar } from '@/lib/utils';

type TweetPageProps = {
  params: {
    // this came from the file name: [tweet_id].tsx
    tweet_id: string;
  };
  searchParams: {
    // this came from the query string: ?username=madmaxieee
    username?: string;
    handle?: string;
  };
};

// these two fields are always available in the props object of a page component
export default async function TweetPage({
  params: { tweet_id },
  searchParams: { username, handle },
}: TweetPageProps) {
  const tweet_id_num = parseInt(tweet_id);

  const errorRedirect = () => {
    const params = new URLSearchParams();
    username && params.set('username', username);
    handle && params.set('handle', handle);
    redirect(`/?${params.toString()}`);
  };

  if (isNaN(tweet_id_num)) {
    errorRedirect();
  }

  // This is the easiest way to get the tweet data
  // you can run separate queries for the tweet data, likes, and liked
  // and then combine them in javascript.
  //
  // This gets things done for now, but it's not the best way to do it
  // relational databases are highly optimized for this kind of thing
  // we should always try to do as much as possible in the database.

  // This piece of code runs the following SQL query on the tweets table:
  // SELECT
  //   id,
  //   content,
  //   user_handle,
  //   created_at
  //   FROM tweets
  //   WHERE id = {tweet_id_num};
  // 抓這個tweet的相關資料
  const [tweetData] = await db
    .select({
      id: eventsTable.id,
      content: eventsTable.content,
      userHandle: eventsTable.userHandle,
      createdAt: eventsTable.createdAt,
    })
    .from(eventsTable)
    .where(eq(eventsTable.id, tweet_id_num))
    .execute();

  // Although typescript thinks tweetData is not undefined, it is possible
  // that tweetData is undefined. This can happen if the tweet doesn't exist.
  // Thus the destructuring assignment above is not safe. We need to check
  // if tweetData is undefined before using it.
  if (!tweetData) {
    errorRedirect();
  }

  // This piece of code runs the following SQL query on the tweets table:
  // SELECT
  //  id,
  //  FROM likes
  //  WHERE tweet_id = {tweet_id_num};
  // Since we only need the number of likes, we don't actually need to select
  // the id here, we can select a constant 1 instead. Or even better, we can
  // use the count aggregate function to count the number of rows in the table.
  // This is what we do in the next code block in likesSubquery.
  // 抓所有like這個tweet的人
  const likes = await db
    .select({
      id: joinsTable.id,
    })
    .from(joinsTable)
    .where(eq(joinsTable.tweetId, tweet_id_num))
    .execute();

  const numLikes = likes.length; // 計算有幾人like

  // 抓你有沒有liked過這篇tweet
  const [liked] = await db
    .select({
      id: joinsTable.id,
    })
    .from(joinsTable)
    .where(
      and(
        eq(joinsTable.tweetId, tweet_id_num),
        eq(joinsTable.userHandle, handle ?? ''),
      ),
    )
    .execute();

  // 抓發推者的資料
  const [user] = await db
    .select({
      displayName: usersTable.displayName,
      handle: usersTable.handle,
    })
    .from(usersTable)
    .where(eq(usersTable.handle, tweetData.userHandle))
    .execute();

  // 建立整個tweet的js obj
  const tweet = {
    id: tweetData.id,
    content: tweetData.content,
    username: user.displayName,
    handle: user.handle,
    likes: numLikes,
    createdAt: tweetData.createdAt,
    liked: Boolean(liked),
  };

  // The following code is almost identical to the code in src/app/page.tsx
  // read the comments there for more info.
  const likesSubquery = db.$with('likes_count').as(
    db
      .select({
        tweetId: joinsTable.tweetId,
        likes: sql<number | null>`count(*)`.mapWith(Number).as('likes'),
      })
      .from(joinsTable)
      .groupBy(joinsTable.tweetId),
  );

  const likedSubquery = db.$with('liked').as(
    db
      .select({
        tweetId: joinsTable.tweetId,
        liked: sql<number>`1`.mapWith(Boolean).as('liked'),
      })
      .from(joinsTable)
      .where(eq(joinsTable.userHandle, handle ?? '')),
  );

  const replies = await db
    .with(likesSubquery, likedSubquery)
    .select({
      id: eventsTable.id,
      content: eventsTable.content,
      username: usersTable.displayName,
      handle: usersTable.handle,
      likes: likesSubquery.likes,
      createdAt: eventsTable.createdAt,
      liked: likedSubquery.liked,
    })
    .from(eventsTable)
    .where(eq(eventsTable.replyToTweetId, tweet_id_num))
    .orderBy(desc(eventsTable.createdAt))
    .innerJoin(usersTable, eq(eventsTable.userHandle, usersTable.handle))
    .leftJoin(likesSubquery, eq(eventsTable.id, likesSubquery.tweetId))
    .leftJoin(likedSubquery, eq(eventsTable.id, likedSubquery.tweetId))
    .execute();

  return (
    <>
      <div className="flex h-screen w-full max-w-2xl flex-col overflow-scroll pt-2">
        <div className="mb-2 flex items-center gap-8 px-4">
          <Link href={{ pathname: '/', query: { username, handle } }}>
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-xl font-bold">瀏覽活動頁面</h1>
        </div>
        <div className="flex flex-col px-4 pt-3">
          <div className="flex justify-between">
            <div className="flex w-full gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAvatar(tweet.username)}
                alt="user avatar"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-bold">{tweet.username ?? '...'}</p>
                <p className="font-normal text-gray-500">
                  @{tweet.handle ?? '...'}
                </p>
              </div>
            </div>
            <button className="h-fit rounded-full p-2.5 text-gray-400 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <article className="mt-3 whitespace-pre-wrap text-xl">
            {tweet.content}
          </article>
          <time className="my-4 block text-sm text-gray-500">
            <TimeText date={tweet.createdAt} format="h:mm A · D MMM YYYY" />
          </time>
          <Separator />
          <div className="my-2 flex items-center justify-between gap-4 text-gray-400">
            <JoinButton
              handle={handle}
              initialLikes={tweet.likes}
              initialLiked={tweet.liked}
              tweetId={tweet.id}
            />
          </div>
          <Separator />
        </div>
        <ReplyInput
          replyToTweetId={tweet.id}
          replyToHandle={tweet.handle}
          initialLiked={tweet.liked}
        />
        <Separator />
        {replies.map((reply) => (
          <Event
            key={reply.id}
            id={reply.id}
            username={username}
            handle={handle}
            authorName={reply.username}
            authorHandle={reply.handle}
            content={reply.content}
            likes={reply.likes}
            liked={reply.liked}
            createdAt={reply.createdAt!}
          />
        ))}
      </div>
    </>
  );
}
