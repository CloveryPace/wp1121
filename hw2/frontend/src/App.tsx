import { useState, useEffect } from 'react';

import { PlaylistRemove as RemoveIcon } from '@mui/icons-material';
import { PlaylistAdd as AddIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';

import HeaderBar from './components/HeaderBar';
import NewListDialog from './components/NewListDialog';

function App() {
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [deleteModeOn, setDeleteModeOn] = useState(false);

  return (
    <>
      <HeaderBar></HeaderBar>
      <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
        <div>
          <Button
            variant="contained"
            // className="w-80"
            onClick={() => setNewListDialogOpen(true)}
          >
            <AddIcon className="mr-2" />
            Add
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => alert('delete')}
          >
            <RemoveIcon className="mr-2" />
            Delete
          </Button>
        </div>
        <NewListDialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
        ></NewListDialog>
      </main>
    </>
  );
}

export default App;
