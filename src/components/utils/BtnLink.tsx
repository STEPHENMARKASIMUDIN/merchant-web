import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { NavLinkProps } from 'react-router-dom';
import { ButtonProps } from '@material-ui/core/Button';


interface BtnLinkProps extends ButtonProps {
  isFullWidth?: boolean
  to: string
  label: string
}

const BtnLink = ({ to, label, color, variant, classes, isFullWidth = false, ...rest }: BtnLinkProps) => (
  <Button
    color={color}
    fullWidth={isFullWidth}
    variant={variant}
    style={{ fontSize: 13, ...rest }}
    className={classes as string ? classes as string : null}
    component={(props: ButtonProps & NavLinkProps) => <NavLink to={to} {...props} />}>
    {label}
  </Button>
);

BtnLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  classes: PropTypes.string,
  rest: PropTypes.object
}






export default BtnLink;