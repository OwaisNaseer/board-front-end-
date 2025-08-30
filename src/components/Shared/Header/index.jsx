import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { NotificationIcon } from '../../../assets/icons';
import { getPageName } from '../../../utils/utils';
import LogoutIcon from '@mui/icons-material/Logout';
import Line from '../Line';
import { data } from '../../../utils/data';
import { CustomPopover } from '../CustomPopover';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAvatar } from '../CustomAvatar';
import { PopoverData } from '../PopoverData';
import { logoutUser } from '../../../redux/features/auth/authSlice';
import { getNotifications } from '../../../redux/features/notifications/notificationsSlice';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';

const Header = () => {
  // PARAMS
  const params = useLocation();
  const pageName = params.pathname.split('/')[1];

  // DATA
  const user = useSelector((state) => state?.auth?.user);
  console.log('user', user);
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );
  console.log('notification', notifications);
  const actions = data.accountActions;
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const popoverData = [
    {
      icon: <ManageAccountsIcon fontSize='small' />,
      label: { text: 'Profile' },
    },
    {
      icon: <LogoutIcon fontSize='14px' color='error.main' />,
      label: { text: 'Logout' },
      action: handleLogout,
    },
  ];

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleNotificationClick = (notificationId) => {
    console.log('notification clicked', notificationId);
  };

  return (
    <React.Fragment>
      <div className='py-[10px] pl-4 pr-[17px] flex items-center bg-goose-white justify-between border-b border-cool-grey-200 h-[79px]'>
        <div>
          <h1 className='text-[14px] font-[550] leading-[22px] text-foreground-primary'>
            {pageName ? getPageName(pageName) : 'Dashboard'}
          </h1>
        </div>
        <div className='flex items-center gap-3'>
          <CustomPopover
            trigger={
              <Badge
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '12px',
                    padding: '4px',
                  },
                }}
                badgeContent={notifications.length}
                color='error'
              >
                <NotificationIcon />
              </Badge>
            }
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div
              className='w-[300px] p-4 bg-white rounded-lg shadow-lg font-sans'
              style={{ minWidth: '260px', maxWidth: '340px' }}
            >
              <span className='font-semibold text-gray-800 text-[14px] leading-[22px] mb-3 block'>
                Notifications
              </span>
              {loading && (
                <p className='text-center text-gray-500 text-[12px] leading-[22px]'>
                  Loading...
                </p>
              )}

              {!loading && error && (
                <p className='text-center text-red-500 text-[12px] leading-[22px]'>
                  {typeof error === 'string'
                    ? error
                    : 'Failed to load notifications'}
                </p>
              )}

              {!loading && !error && notifications.length === 0 && (
                <p className='text-center text-gray-500 text-[12px] leading-[22px]'>
                  No notifications
                </p>
              )}
              <div className='max-h-[320px] overflow-y-auto text-[12px] leading-[22px]'>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start py-2 px-3 cursor-pointer hover:bg-gray-100 rounded-md mb-1 ${
                      notification.is_read ? 'bg-gray-50' : 'bg-white'
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className='mr-3 mt-1'>
                      {notification.is_read ? (
                        <NotificationsIcon color='disabled' fontSize='small' />
                      ) : (
                        <CircleIcon color='primary' fontSize='small' />
                      )}
                    </div>
                    <div>
                      <span
                        className={`font-medium block ${
                          notification.is_read
                            ? 'text-gray-500'
                            : 'text-gray-800'
                        }`}
                      >
                        {notification.title}
                      </span>
                      <p
                        className={`text-gray-500 text-sm ${
                          notification.is_read ? 'opacity-75' : ''
                        }`}
                      >
                        {notification.message} •{' '}
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CustomPopover>

          <CustomPopover
            trigger={
              <CustomAvatar
                userName={user?.first_name}
                hideUsername={true}
                role={user?.role}
                reverse
              />
            }
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div
              className='w-[180px] sm:w-[200px] p-4 bg-white rounded-lg shadow-lg'
              style={{ minWidth: '160px', maxWidth: '220px' }}
            >
              <CustomAvatar
                userName={user?.first_name}
                role={user?.role}
                reverse
              />
              <Line className={'my-3 border-gray-200 dark:border-gray-600'} />
              {popoverData.map(({ icon, label, action }, index) => (
                <div
                  key={index}
                  className='flex flex-col py-1'
                  onClick={action}
                >
                  <PopoverData icon={icon} label={label} />
                </div>
              ))}
            </div>
          </CustomPopover>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
