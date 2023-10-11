import { Link } from 'react-router-dom';

import reactLogo from '../assets/react.svg';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import useData from '@/hooks/useData';
import { deleteList } from '@/utils/client';

import type { SongProp } from './Song';

export type PlaylistProp = {
  id: string;
  title: string;
  _: string;
  songs: SongProp[];
};

const PlaylistCard = ({ id, title, _, songs }: PlaylistProp) => {
  // const [editingTitle, setEditingTitle] = useState(false);
  // const titleRef = useRef<HTMLInputElement>(null);

  const { fetchLists } = useData();
  const handleDeleteList = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert('Error: Failed to delete list');
    }
  };
  return (
    <>
      <div className="card-container">
        <IconButton
          aria-label="close"
          onClick={handleDeleteList}
          sx={{
            right: 8,
            top: 8,
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Link to={`/${id}`}>
          <div className="animate-slideup flex w-[250px] cursor-pointer flex-col rounded-lg p-4 hover:bg-slate-100">
            <div className="group relative h-56 w-full">
              <div
                className={`absolute inset-0 items-center justify-center  hover:flex group-hover:flex`}
              ></div>
              <img
                alt="song_img"
                src={reactLogo}
                className="h-full w-full rounded-lg"
              />
            </div>

            <div className="mt-4 flex flex-col">
              <Typography variant="h5" color="initial">
                {title}
              </Typography>
              <Typography variant="h6" color="initial">
                {songs.length}首歌
              </Typography>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PlaylistCard;
