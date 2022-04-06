import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="menu-icon dw dw-menu" />
      </div>
      <div className="header-right">
        <div className="dashboard-setting user-notification">
          <div className="dropdown">
            <a
              className="dropdown-toggle no-arrow"
              href="javascript:;"
              data-toggle="right-sidebar"
            >
              <i className="dw dw-settings2" />
            </a>
          </div>
        </div>

        <div className="user-info-dropdown">
          <div className="dropdown">
            <a
              className="dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
            >
              <span className="user-icon">
                <img src="vendors/images/photo1.jpg" alt />
              </span>
              <span className="user-name">Kabir</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
              <Link className="dropdown-item" to="/profile">
                <i className="dw dw-user1" /> Profile
              </Link>
              <Link className="dropdown-item" to="/settings">
                <i className="dw dw-settings2" /> Setting
              </Link>

              <Link className="dropdown-item" to="/logout">
                <i className="dw dw-logout" /> Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
