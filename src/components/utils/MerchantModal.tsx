import React from 'react';
import { Center } from './Containers';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@material-ui/core';


interface MerchantModalProps {
  open: boolean
  isDraggable: boolean
  title: string
  handleClose: (event: React.MouseEvent) => any
  contentText?: string
  children: JSX.Element
  cancelLabel?: string | boolean
  submitLabel?: string | boolean
  disabled: boolean | Function
  width?: false | "xs" | "sm" | "md" | "lg" | "xl"
  isCenter?: boolean
  submitCallback?: (event: React.MouseEvent) => any
}

const MerchantModal = ({
  open, handleClose, title,
  children, disabled,
  cancelLabel = false,
  submitLabel = "",
  contentText = "",
  submitCallback,
  isCenter = true,
  width = 'xs',
  isDraggable = true,
  ...rest
}: MerchantModalProps) => {
  const isButtonDisabled = typeof disabled == 'function' ? disabled() : disabled;
  return (
    <Dialog open={open}
      {...rest}
      fullWidth
      maxWidth={width}
      aria-labelledby="Change Password Modal"
      onClose={handleClose}>
      <DialogTitle className="modal-header">
        {title}
      </DialogTitle>
      <DialogContent className="pt-1 modal-content">
        <DialogContentText>
          {contentText ? contentText : null}
        </DialogContentText>
        <Center classes={!isDraggable ? null : 'mt-1'} justify={isCenter ? null : 'flex-start'}>
          {children}
        </Center>
      </DialogContent>
      <DialogActions className="modal-actions">
        <Button
          onClick={handleClose}
          children={cancelLabel || "Cancel"}
          variant="contained" />
        <Button
          onClick={submitCallback}
          children={submitLabel || "Save"}
          disabled={isButtonDisabled}
          variant="contained"
          color="secondary"
        />
      </DialogActions>
    </Dialog>
  )
};



export default MerchantModal;