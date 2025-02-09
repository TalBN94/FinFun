import React from 'react';
import { Box, IconButton, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dropdown from '../header/Dropdown';

const Header = ({ 
  // Position and layout props
  position = 'fixed',
  topSpacing = "2rem",
  height = '60px',
  padding = '0 20px',
  zIndex = 1000,
  
  // Avatar props
  avatarSrc = "#",
  avatarSize = "2.5rem",
  avatarBorderColor = "#8F00FF",
  showAvatar = true,
  
  // Notification props
  showNotifications = true,
  notificationColor = "#8F00FF",
  
  // Dropdown props
  showDropdown = true,
  
  // Background props
  backgroundColor = 'white',
  
  // Custom styles
  customStyles = {},
  
  // Event handlers
  onAvatarClick,
  onNotificationClick,
  
  // Children for additional content
  children
}) => {
  return (
    <Box
      sx={{
        height: height,
        backgroundColor: backgroundColor,
        position: position,
        top: topSpacing,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: padding,
        zIndex: zIndex,
        ...customStyles
      }}
    >
      {showAvatar && (
        <Avatar 
          src={avatarSrc} 
          onClick={onAvatarClick}
          sx={{
            height: avatarSize,
            width: avatarSize,
            borderRadius: "50%",
            border: `0.5px ${avatarBorderColor} solid`,
            cursor: onAvatarClick ? 'pointer' : 'default'
          }}
        />
      )}
      
      {showDropdown && <Dropdown />}
      
      {children}  
      
      {showNotifications && (
        <IconButton onClick={onNotificationClick}>
          <NotificationsIcon 
            sx={{
              color: notificationColor,
              "& .MuiBottomNavigationAction-root.Mui-selected": {
                color: notificationColor,
              }
            }}
          />
        </IconButton>
      )}
    </Box>
  );
};

export default Header;