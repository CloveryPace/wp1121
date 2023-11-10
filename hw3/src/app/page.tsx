import { eq, desc, isNull, sql } from 'drizzle-orm';

import Event from '@/components/Event';
import EventBar from '@/components/EventBar';
import NameDialog from '@/components/NameDialog';
import UsernameBar from '@/components/UsernameBar';
import { Separator } from '@/components/ui/separator';
import { db } from '@/db';
import { joinsTable, eventsTable, usersTable } from '@/db/schema';

type HomePageProps = {
  searchParams: {
    username?: string;
    handle?: string;
  };
};

const a = 1;
// Since this is a server component, we can do some server side processing
// in the react component. This may seem crazy at first, but it's actually
// a very powerful feature. It allows us to do the data fetching and rendering
// the page in the same place. It may seem weird to run react code on the server,
// but remember, react is not just for the browser, react-dom is. React is just
// the shadow dom and state update logic. We can use react to render anything,
// any where. There are already libraries that use react to render to the terminal,
// email, PDFs, native mobile apps, 3D objects and even videos.
export default async function Home({
  searchParams: { username, handle },
}: HomePageProps) {
  if (username && handle) {
    await db
      .insert(usersTable)
      .values({
        displayName: username,
        handle,
      })
      // Since handle is a unique column, we need to handle the case
      // where the user already exists. We can do this with onConflictDoUpdate
      // If the user already exists, we just update the display name
      // This way we don't have to worry about checking if the user exists
      // before inserting them.
      .onConflictDoUpdate({
        target: usersTable.handle,
        set: {
          displayName: username,
        },
      })
      .execute();
  }

  // This is a good example of using subqueries, joins, and with statements
  // to get the data we need in a single query. This is a more complicated
  // query, go to src/app/tweet/[tweet_id]/page.tsx to see a simpler example.
  //
  // This is much more efficient than running separate queries for tweets,
  // likes, and liked, and then combining them in javascript. Not only is
  // the data processing done in the database, but we also only need to
  // make a single request to the database instead of three.

  // WITH clause is used to create a temporary table that can be used in the
  // main query. This is useful for creating subqueries that are used multiple
  // times in the main query. Or just to make the main query more readable.
  // read more about it here: https://orm.drizzle.team/docs/select#with-clause
  // If you're familiar with CTEs in SQL, watch this video:
  // https://planetscale.com/learn/courses/mysql-for-developers/queries/common-table-expressions-ctes
  //
  // This subquery generates the following SQL:
  // WITH likes_count AS (
  //  SELECT
  //   tweet_id,
  //   count(*) AS likes
  //   FROM likes
  //   GROUP BY tweet_id
  // )
  const likesSubquery = db.$with('likes_count').as(
    db
      .select({
        tweetId: joinsTable.tweetId,
        // some times we need to do some custom logic in sql
        // although drizzle-orm is very powerful, it doesn't support every possible
        // SQL query. In these cases, we can use the sql template literal tag
        // to write raw SQL queries.
        // read more about it here: https://orm.drizzle.team/docs/sql
        likes: sql<number | null>`count(*)`.mapWith(Number).as('likes'),
      })
      .from(joinsTable)
      .groupBy(joinsTable.tweetId),
  );

  // This subquery generates the following SQL:
  // WITH liked AS (
  //  SELECT
  //   tweet_id,
  //   1 AS liked
  //   FROM likes
  //   WHERE user_handle = {handle}
  //  )
  const likedSubquery = db.$with('liked').as(
    db
      .select({
        tweetId: joinsTable.tweetId,
        // this is a way to make a boolean column (kind of) in SQL
        // so when this column is joined with the tweets table, we will
        // get a constant 1 if the user liked the tweet, and null otherwise
        // we can then use the mapWith(Boolean) function to convert the
        // constant 1 to true, and null to false
        liked: sql<number>`1`.mapWith(Boolean).as('liked'),
      })
      .from(joinsTable)
      .where(eq(joinsTable.userHandle, handle ?? '')),
  );

  const tweets = await db
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
    .where(isNull(eventsTable.replyToTweetId))
    .orderBy(desc(eventsTable.createdAt))
    // JOIN is by far the most powerful feature of relational databases
    // it allows us to combine data from multiple tables into a single query
    // read more about it here: https://orm.drizzle.team/docs/select#join
    // or watch this video:
    // https://planetscale.com/learn/courses/mysql-for-developers/queries/an-overview-of-joins
    .innerJoin(usersTable, eq(eventsTable.userHandle, usersTable.handle))
    .leftJoin(likesSubquery, eq(eventsTable.id, likesSubquery.tweetId))
    .leftJoin(likedSubquery, eq(eventsTable.id, likedSubquery.tweetId))
    .execute();

  return (
    <>
      <div className="flex h-screen w-full max-w-2xl flex-col overflow-scroll pt-2">
        <h1 className="mb-2 bg-white px-4 text-xl font-bold">Join Me!</h1>
        <div className="w-full px-4 pt-3">
          <UsernameBar />
          <Separator></Separator>
          <EventBar />
        </div>
        <Separator />
        {tweets.map((tweet) => (
          <Event
            key={tweet.id}
            id={tweet.id}
            username={username}
            handle={handle}
            authorName={tweet.username}
            authorHandle={tweet.handle}
            content={tweet.content}
            likes={tweet.likes}
            liked={tweet.liked}
            createdAt={tweet.createdAt!}
          />
        ))}
      </div>
      <NameDialog />
    </>
  );
}
