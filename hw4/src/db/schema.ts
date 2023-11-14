import { relations } from 'drizzle-orm';
import {
	index,
	text,
	pgTable,
	serial,
	uuid,
	varchar,
	unique,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable(
	'users',
	{
		id: serial('id').primaryKey(),
		displayId: uuid('display_id').defaultRandom().notNull().unique(),
		username: varchar('username', { length: 100 }).notNull(),
		email: varchar('email', { length: 100 }).notNull().unique(),
		hashedPassword: varchar('hashed_password', { length: 100 }),
		provider: varchar('provider', {
			length: 100,
			enum: ['github', 'credentials'],
		})
			.notNull()
			.default('credentials'),
	},
	(table) => ({
		displayIdIndex: index('display_id_index').on(table.displayId),
		emailIndex: index('email_index').on(table.email),
	})
);

/*
export const chatsTable = pgTable(
	'chats',
	{
		id: serial('id').primaryKey(),
		displayId: uuid('display_id').defaultRandom().notNull().unique(),
		senderUsername: varchar('user_handle', { length: 50 })
			.notNull()
			// this is a foreign key constraint. It ensures that the user_handle
			// column in this table references a valid user_handle in the users table.
			// We can also specify what happens when the referenced row is deleted
			// or updated. In this case, we want to delete the tweet if the user
			// is deleted, so we use onDelete: "casscade". It is similar for onUpdate.
			.references(() => usersTable.username, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(table) => ({
		displayIdIndex: index('display_id_index').on(table.displayId),
	})
);

export const messagesTable = pgTable(
  'messages',
  {
    id: serial('id').primaryKey(),
		displayId: uuid('display_id').defaultRandom().notNull().unique(),
    senderUsername
  }
)
*/
