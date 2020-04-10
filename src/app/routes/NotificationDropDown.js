/* eslint-disable arrow-body-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-expressions */
import React from 'react';

const NotificationDropDown = () => {
  return (
    <div className="dropdown-notification">
      <ul>
        <a href="/profile">
          <li>
            Placide has published new article
          </li>
        </a>
        <a href="/Create">
          <li>
            Raymond has published new article
          </li>
        </a>
      </ul>
    </div>
  );
};

export default NotificationDropDown;
