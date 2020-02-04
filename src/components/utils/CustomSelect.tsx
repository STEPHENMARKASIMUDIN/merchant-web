import React from 'react';
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem } from '@material-ui/core';
import { AddOptionsData } from '../../helpers/merchantTypes';

interface CustomSelectProps {
  context: any
  name: string
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => void
  labelWidth: number
  selectLabel: string
  value: string
  options: AddOptionsData[]
  defaultSelectVal?: boolean | string
  notRequired?: boolean
  classes?: string
  isDisabled?: boolean
}

const CustomSelect = ({ context, name,
  handleChange, labelWidth,
  selectLabel, value, options, defaultSelectVal = false,
  notRequired = false, classes = "", isDisabled = false
}: CustomSelectProps) => {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      className={classes}
      required={!notRequired ? true : false} >
      <InputLabel
        className={isDisabled ? 'text-black' : null}
        ref={ref => context ? (context.labelRef = ref) : null}
        htmlFor={name}
        shrink>
        {selectLabel ? selectLabel : ''}
      </InputLabel>
      <Select
        onChange={handleChange}
        value={value}
        style={{
          backgroundColor: isDisabled ? '#cecece' : null
        }}
        displayEmpty
        input={
          <OutlinedInput
            id={name}
            disabled={isDisabled}
            notched
            name={name}
            labelWidth={labelWidth ? labelWidth : 0}
          />
        }>
        <MenuItem value="" disabled>
          <em>{defaultSelectVal ? defaultSelectVal : 'Select'}</em>
        </MenuItem>
        {options.map(o => (<MenuItem
          key={o.label}
          value={o.value}>
          {o.label}
        </MenuItem>))}
      </Select>
    </FormControl >
  )
};


CustomSelect.propTypes = {
  // context: PropTypes.object,
  // name: PropTypes.string,
  // handleChange: PropTypes.func,
  // options: PropTypes.array,
  // labelWidth: PropTypes.number,
  // selectLabel: PropTypes.string,
  // value: PropTypes.string,
  // defaultSelectVal: PropTypes.string,
  // notRequired: PropTypes.bool
};


export default CustomSelect;

