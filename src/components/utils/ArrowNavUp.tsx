import React from 'react';
import { ArrowUpward } from '@material-ui/icons';
import { IconButton, Fade } from '@material-ui/core';
import PropTypes from 'prop-types';

interface ArrowUpNavProps {
  isIn: boolean
}

const ArrowUpNav = ({ isIn }: ArrowUpNavProps) => (
  <Fade in={isIn}>
    <IconButton
      onClick={() => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
      }}
      className="arrow-up">
      <ArrowUpward
        color="inherit"
      />
    </IconButton>
  </Fade>
);


ArrowUpNav.defaultProps = {
  isIn: false
}

ArrowUpNav.propTypes = {
  isIn: PropTypes.bool.isRequired
}

export default ArrowUpNav;