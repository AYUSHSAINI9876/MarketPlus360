import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  SpaceDashboardOutlined,
  ListAltOutlined,
  PieChartOutline,
  BarChartOutlined,
  AccountBalanceWalletOutlined,
  AppsOutlined,
} from "@mui/icons-material";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };
  const handleProfileClick = () => {
    setIsProfileDropdownOpen((open) => !open);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="/logo.png" alt="MarketPlus360" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                <SpaceDashboardOutlined style={{ fontSize: "1rem" }} className="me-2" /> Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                <ListAltOutlined style={{ fontSize: "1rem" }} className="me-2" /> Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                <PieChartOutline style={{ fontSize: "1rem" }} className="me-2" /> Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                <BarChartOutlined style={{ fontSize: "1rem" }} className="me-2" /> Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                <AccountBalanceWalletOutlined style={{ fontSize: "1rem" }} className="me-2" /> Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                <AppsOutlined style={{ fontSize: "1rem" }} className="me-2" /> Apps
              </p>
            </Link>
          </li>

        </ul>
        <hr />
        <div className="profile-wrapper" style={{ position: "relative" }}>
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">{initials}</div>
            <p className="username">{user?.name || "USER"}</p>
          </div>
          {isProfileDropdownOpen && (
            <div
              className="profile-dropdown"
              style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                left: 0,
                background: "var(--bg-sidebar)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "10px",
                minWidth: "160px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                zIndex: 20,
              }}
            >
              <p className="mb-2 small text-muted">{user?.mobile}</p>
              <button className="btn btn-sm btn-outline-danger w-100" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
