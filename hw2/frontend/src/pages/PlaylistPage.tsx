import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import reactLogo from '../assets/react.svg';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import NewSongDialog from '@/components/NewSongDialog';

const PlaylistPage = () => {
  const [newSongDialogOpen, setNewSongDialogOpen] = useState(false);
  const { id } = useParams();

  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {});
  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(e.target.checked);
  };

  const handleDeleteSongs = () => {};
  return (
    <>
      <div className="btns">
        <Button variant="contained" onClick={() => setNewSongDialogOpen(true)}>
          Add Song
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteSongs}>
          Delete Songs
        </Button>
      </div>

      <img
        alt="song_img"
        src={reactLogo}
        className="h-56 w-[250px] rounded-lg"
      />
      <Typography variant="h4" color="initial">
        {id}
      </Typography>
      <FormControlLabel
        label="Select All"
        control={
          <Checkbox
            onChange={handleSelectAllChange}
            color="primary"
            name="selectAllCheckebox"
          />
        }
      />
      <NewSongDialog
        open={newSongDialogOpen}
        onClose={() => setNewSongDialogOpen(false)}
        listId={id as string}
      ></NewSongDialog>
    </>
  );
};

export default PlaylistPage;
