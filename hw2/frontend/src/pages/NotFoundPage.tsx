import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <Typography variant="h4" color="initial">
        Page not found
      </Typography>
      <Link to="/">
        <Typography variant="h5" color="primary">
          Go back to Homepage
        </Typography>
      </Link>
    </div>
  );
};

export default NotFoundPage;
