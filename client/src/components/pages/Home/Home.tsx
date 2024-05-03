import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import LogoutButton from './LogoutButton/LogoutButton';

function Home(): ReactElement {
  return (
    <div>
      <h1>{'Home'}</h1>
      <div>
        <Link to={'/books'}>{'My Books'}</Link>
      </div>
      <LogoutButton />
    </div>
  );
}

export default Home;
