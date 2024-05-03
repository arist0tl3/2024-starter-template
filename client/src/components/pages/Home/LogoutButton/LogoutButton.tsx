import { ReactElement } from 'react';

import { useLogoutMutation } from '../../../../generated';

function LogoutButton(): ReactElement {
  const [logout] = useLogoutMutation({
    refetchQueries: ['CurrentUser'],
    update: () => {
      localStorage.setItem('auth_token', '');
    },
  });

  const handleButtonClick = (): void => {
    logout().catch((err) => console.log(err));
  };

  return <button onClick={handleButtonClick}>{'Log out'}</button>;
}

export default LogoutButton;
