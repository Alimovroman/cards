import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import React from "react";
import Avatar from "@mui/material/Avatar";
import { useActions, useAppSelector } from "common/hooks";
import { userNameSelector } from "features/auth/auth.selector";
import { authThunks } from "features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import style from "features/Header/Header.module.css";

export const UserMenu = () => {
  const userName = useAppSelector(userNameSelector);
  const { logout } = useActions(authThunks);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    logout()
      .then(() => {
        navigate("/login");
        setAnchorEl(null);
      });
  };
  const profileHandler = () => {
    navigate('./profile')
    setAnchorEl(null);
  }
  return (
    <div className={style.userMenuWrapper}>
      {/*<button onClick={logoutHandler}>Logout</button>*/}
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {userName}
        <Avatar alt="Remy Sharp" src="https://mir-s3-cdn-cf.behance.net/projects/original/ab3ece32779061.Y3JvcCwxMjY5LDk5MiwyNTUsMTI0.jpg" className={style.avatar}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={profileHandler}>Profile</MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

