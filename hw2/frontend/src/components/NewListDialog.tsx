import { useRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { createList } from '@/utils/client';

// prop; component to component
// 定義從parent這個compenent的prop的型別
type NewListDialogProp = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProp) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleAddList = async () => {
    // try {
    //   await createList({})
    // }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a new playlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            inputRef={titleRef}
            label="Title"
            variant="outlined"
            sx={{ mt: 2 }}
            autoFocus
          />
          <TextField
            className="block h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            multiline={true}
            inputRef={descriptionRef}
            label="Description"
            variant="outlined"
            sx={{ mt: 2 }}
            autoFocus
          />
          {/* <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button> */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>Confirm</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
