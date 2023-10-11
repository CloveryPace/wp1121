import { useRef } from 'react';

import { Button, DialogActions } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import useData from '@/hooks/useData';
import { createSong } from '@/utils/client';

type NewSongDialogProp = {
  open: boolean;
  onClose: () => void;
  listId: string;
};

const NewSongDialog = ({ open, onClose, listId }: NewSongDialogProp) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const singerRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const { fetchSongs } = useData();

  const handleAddSong = async () => {
    const newTitle = titleRef.current?.value ?? '';
    const newSinger = singerRef.current?.value ?? '';
    const newLink = linkRef.current?.value ?? '';

    if (!newTitle) {
      alert('Please enter a title!');
      return;
    }
    if (!newSinger) {
      alert('Please enter a singer!');
      return;
    }
    if (!newLink) {
      alert('Please enter a link!');
      return;
    }

    try {
      await createSong({
        title: newTitle,
        singer: newSinger,
        link: newLink,
        list_id: listId,
      });
      fetchSongs();
    } catch {
      alert('Error: Failed to create song');
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a new Song</DialogTitle>
      <DialogContent>
        <TextField
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          inputRef={titleRef}
          label="Title"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
          id="title-input"
        />
        <TextField
          className="block h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          multiline={true}
          inputRef={singerRef}
          label="Singer"
          variant="outlined"
          sx={{ mt: 2 }}
          id="description-input"
        />
        <TextField
          className="block h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          multiline={true}
          inputRef={linkRef}
          label="Link"
          variant="outlined"
          sx={{ mt: 2 }}
          id="description-input"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddSong}>Confirm</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewSongDialog;
