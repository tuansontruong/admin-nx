import React from 'react';
import { usePopper } from 'react-popper';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/constants';

const UserDropdown = () => {
  const [btnDropdown, setBtnDropdown] = React.useState<any>();
  const [popoverDropdown, setPopoverDropdown] = React.useState<any>();
  const [isShow, setIsShow] = React.useState(false);

  const { styles, attributes } = usePopper(btnDropdown, popoverDropdown, {
    placement: 'bottom-start',
  });

  const navigate = useNavigate();

  const handleDropdown = () => {
    setIsShow(!isShow);
  };

  const handleSignout = () => {
    localStorage.removeItem('access_token');
    navigate(PATHS.LOGIN_PATH, { replace: true });
  };

  return (
    <div className=" cursor-pointer">
      <a
        className="text-blueGray-500 block"
        ref={setBtnDropdown}
        onClick={handleDropdown}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={'avatar.jpg'}
            />
          </span>
        </div>
      </a>
      {isShow && (
        <div
          ref={setPopoverDropdown}
          style={styles.popper}
          {...attributes.popper}
          className={
            ' bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
          }
        >
          <a
            className={
              'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
            }
            onClick={(e) => e.preventDefault()}
          >
            Profile
          </a>
          <a
            className={
              'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
            }
            onClick={(e) => e.preventDefault()}
          >
            Setting
          </a>
          {/* <a
            href="#pablo"
            className={
              'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
            }
            onClick={(e) => e.preventDefault()}
          >
            Something else here
          </a> */}
          <div className="h-0 my-2 border border-solid border-blueGray-100" />
          <a
            className={
              'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
            }
            onClick={handleSignout}
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
