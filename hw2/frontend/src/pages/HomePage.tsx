import { useState, useEffect } from 'react';

import { PlaylistRemove as RemoveIcon } from '@mui/icons-material';
import { PlaylistAdd as AddIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';

import NewListDialog from '@/components/NewListDialog';
import PlaylistCard from '@/components/PlaylistCard';
import useData from '@/hooks/useData';

const HomePage = () => {
  const { lists, fetchLists, fetchSongs } = useData();
  const [newListDialogOpen, setNewListDialogOpen] = useState<boolean>(false);

  const [deleteModeOn, setDeleteModeOn] = useState<boolean>(false);
  const [deleteBtnText, setDeleteBtnText] = useState<string>();

  const handleDeleteModeChange = () => {
    setDeleteModeOn((curMode) => !curMode);
  };

  useEffect(() => {
    if (deleteModeOn) setDeleteBtnText('Done');
    else setDeleteBtnText('Delete');
  }, [deleteModeOn]);

  useEffect(() => {
    fetchLists();
    fetchSongs();
  }, [fetchSongs, fetchLists]);
  return (
    <>
      <div className="btns">
        <Button
          variant="contained"
          onClick={() => setNewListDialogOpen(true)}
          disabled={deleteModeOn}
        >
          <AddIcon className="mr-2" />
          Add
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleDeleteModeChange}
        >
          <RemoveIcon className="mr-2" />
          {deleteBtnText}
        </Button>
      </div>
      <div className="flex flex-row gap-6">
        {lists.map((list) => (
          <PlaylistCard key={list.id} {...list} />
        ))}
      </div>
      <NewListDialog
        open={newListDialogOpen}
        onClose={() => setNewListDialogOpen(false)}
      ></NewListDialog>
    </>
  );
};

export default HomePage;
