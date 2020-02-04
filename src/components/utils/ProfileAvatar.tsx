import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Center } from './Containers';
import { Avatar } from '@material-ui/core';

interface ProfileAvatarProps {
  src: string
  classes?: string
  children: ReactNode
  hasContainer?: boolean
  size?: number
}

const ProfileAvatar = ({ src, classes = "", children, hasContainer = true, size = 100 }: ProfileAvatarProps) => {
  return (
    hasContainer ? <Center classes={classes}>
      <Avatar alt="Merchant Profile Image" src={src}
        style={{
          width: size,
          height: size
        }}
      />
    </Center> : <Avatar alt="Merchant Profile Image"
      className={classes}
      src={src}
      style={{
        width: size,
        height: size
      }}
      children={children}
      />
  )
};

ProfileAvatar.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  hasContainer: PropTypes.bool,
  size: PropTypes.number,
  src: PropTypes.string
}


export default ProfileAvatar;