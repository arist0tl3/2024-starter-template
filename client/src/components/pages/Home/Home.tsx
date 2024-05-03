import React, { ReactElement } from 'react';

import LogoutButton from './LogoutButton/LogoutButton';

function Home(): ReactElement {
  return (
    <div>
      <div>{'Home'}</div>
      <LogoutButton />
    </div>
  );
}

export default Home;
