/* eslint-disable @typescript-eslint/no-unused-vars */
import Typography from '@mui/material/Typography';

export type SongProp = {
  id: string;
  title: string;
  singer: string;
  link: string;
  listId: string;
};

const Song = ({ id, title, singer, link }: SongProp) => {
  return (
    <>
      <Typography variant="h1" color="initial"></Typography>
    </>
  );
};

export default Song;
