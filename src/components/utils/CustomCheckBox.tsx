import React from 'react';
import { Checkbox, Typography } from '@material-ui/core';

interface CustomCheckBoxProps {
  label: string
  value?: string
  checkBClasses?: string
  divClasses?: string
}



const CustomCheckBox = (props: CustomCheckBoxProps) => {
  const { label, value = "", checkBClasses, divClasses = "" } = props;
  return (
    <div className={divClasses ? divClasses : null}>
      <Checkbox
        className={checkBClasses ? checkBClasses : null}
        value={value}
        checked
        style={{ transition: 'none' }}
      />
      <Typography
        className="d-inline"
        children={label}
      />
    </div>
  )
}



export default CustomCheckBox;