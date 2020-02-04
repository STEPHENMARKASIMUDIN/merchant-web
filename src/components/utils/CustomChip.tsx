import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

interface CustomChipProps {
  status: 'FULFILLED' | 'UNFULFILLED' | 'WARNING' | 'PENDING'
  onDelete: (event: any) => any
  additionalClasses: string
  dontIncludeDefaultClasses: boolean
}

const CustomChip = ({ status, onDelete, additionalClasses = '', dontIncludeDefaultClasses = false }: CustomChipProps) => {
  let classes = '';
  switch (status) {
    case 'FULFILLED':
      classes += 'text-whito success';
      break;
    case 'UNFULFILLED':
      classes += 'text-black dark';
      break;
    case 'PENDING':
      classes += 'text-whito error';
      break;
    case 'WARNING':
      classes += 'text-dark warning'
      break;
    default:
      classes += 'text-black dark';
      break;
  }

  if (dontIncludeDefaultClasses) {
    classes = '';
  }

  return <Chip
    onDelete={onDelete}
    className={`${classes} ${additionalClasses}`}
    label={status} />

}

CustomChip.propTypes = {
  status: PropTypes.string,
  onDelete: PropTypes.func,
  dontIncludeDefaultClasses: PropTypes.bool
}


export default CustomChip;
