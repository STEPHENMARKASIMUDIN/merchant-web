import React from 'react';
import PropTypes from 'prop-types';
import loadingSrc from '../../images/loading.gif';
import { Avatar, Modal } from "@material-ui/core";

interface LoadingModalProps {
  open: boolean
}

const LoadingModal = ({ open = false }: LoadingModalProps) => (
  <Modal
    aria-labelledby="Merchant Loading"
    aria-describedby="Merchant Loading"
    open={open}>
    <Avatar
      className="modal-loading"
      alt="Loading Image"
      src={loadingSrc}
    />
  </Modal>
)


Modal.defaultProps = {
  open: false
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired
}


export default LoadingModal;