import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import style from './BurgerMenu.module.css'
import learnIcon from 'common/images/learning_icon.svg'
import deleteIcon from 'common/images/remove_icon.svg'
import updateIcon from 'common/images/update_icon.svg'
import { useActions } from "common/hooks";
import { packsThunk } from "features/Packs/service/packs.slice";

type Props = {
  packId: string | undefined
  showUpdateModal: () => void
  showRemoveModal: () => void
}

export const BurgerMenu: FC<Props> = ({packId, showUpdateModal, showRemoveModal}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const learnHandler = () => {
    navigate(`/learn/${packId}`)
    handleClose()
  }
  const removeHandler = () => {
    showRemoveModal()
    // packId && removePack(packId)
    handleClose()
    // navigate(`/packs`)
  }
  const updateHandler = () => {
    handleClose()
    showUpdateModal()
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={style.buttonBurgerMenu}
      >
        <MoreVertOutlinedIcon className={style.iconBurgerMenu} />
      </Button>
      <Menu
        id="basic-menu"
        className={style.burgerMenu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={updateHandler}  className={style.ItemBurgerMenu}>
          <img src={updateIcon} alt={'update'} />
          Edit
        </MenuItem>
        <MenuItem onClick={removeHandler} className={style.ItemBurgerMenu}>
          <img src={deleteIcon} alt={'delete'} />
          Delete
        </MenuItem>
        <MenuItem onClick={learnHandler} className={style.ItemBurgerMenu}>
          <img src={learnIcon} alt={'learn'} />
          Learn
        </MenuItem>
      </Menu>
    </div>
  );
}