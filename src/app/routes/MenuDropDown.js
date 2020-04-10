/* eslint-disable arrow-body-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Logout from '../../feature/auth/logout/Logout';

const MenuDropDown = props => {
  const {
    user: { userName }
  } = props;
  return (
    <div className="dropdown-menu">
      <ul>
        <li className="user-name">{`@${userName}`}</li>
        <a href={`/profile/${userName}`}>
          <li>Profile</li>
        </a>
        <a href="/Create">
          <li>Create article</li>
        </a>
        <a href="/bookmarks">
          <li>
            Bookmarks
          </li>
        </a>
        <Logout />
      </ul>
    </div>
  );
};

export default MenuDropDown;
