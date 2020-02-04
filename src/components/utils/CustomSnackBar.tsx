import React from 'react';
import classNames from 'classnames';
import { Close } from '@material-ui/icons';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import { SnackBIcon, snackBarVariant } from '../../merchant-theme/styles';

interface SnackBProps {
  handleClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  variant?: string
  message?: string
  [propName: string]: any
}



const SnackB = (props: SnackBProps) => {

  const { handleClose, variant, message, ...rest } = props;
  let style = snackBarVariant[variant]
  const Icon = SnackBIcon[variant];
  if (!style) {
    style = {};
  }

  //Incorrect Username Or Password. Please Try Again.
  const isMessageTooLong = message.length > 51;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      ContentProps={{ style }}
      autoHideDuration={3000}
      onClose={handleClose}
      {...rest}>
      <SnackbarContent
        style={{ ...style, margin: 16 }}
        action={[
          // <IconButton
          //   key="close"
          //   aria-label="Close"
          //   color="inherit"
          //   style={{ padding: 4 }}
          //   onClick={handleClose}
          //   children={<Close />}
          // />
        ]}
        message={<span className="span-snackbar">
          <Icon className="icon-variant icon-snackbar" />
          <span className={classNames({
            'font-smaller': isMessageTooLong
          })}>
            {message}
          </span>
        </span>}
      />
    </Snackbar>
  )
};



export default SnackB;


