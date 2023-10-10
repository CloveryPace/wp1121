export type SongData = {
	id: string;
	title: string;
	singer: string;
	link: string;
	list_id: string;
};

export type ListData = {
	id: string;
	title: string;
	description: string;
	songs: SongData[];
};

export type GetSongsResponse = SongData[];

export type GetSongResponse = SongData;

// Types can also be derived from other types using utility types. These are
// a few examples of utility types:
// for more information, see: https://www.typescriptlang.org/docs/handbook/utility-types.html
// You don't need to memorize these, but it's good to know they exist.
export type CreateSongPayload = Omit<SongData, 'id'>;

export type CreateSongResponse = Pick<SongData, 'id'>;

export type UpdateSongPayload = Partial<Omit<SongData, 'id'>>;

export type UpdateSongResponse = 'OK';

export type DeleteSongResponse = 'OK';

export type GetListsResponse = Omit<ListData, 'songs'>[];

export type CreateListPayload = Omit<ListData, 'id' | 'songs'>;

export type CreateListResponse = Pick<ListData, 'id'>;

export type UpdateListPayload = Partial<Omit<ListData, 'id' | 'songs'>>;

export type UpdateListResponse = 'OK';

export type DeleteListResponse = 'OK';
