import React from 'react';
import theme from '../../merchant-theme/theme';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import DateFnsUtilities from '@date-io/date-fns';
import { withStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider, InlineDatePicker } from 'material-ui-pickers';


const MDatePicker = ({ handleDateChange, label, state, name, errors, request, classNames, handleInputValidate, handleDChange, isFormatMonth = false }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtilities} theme={theme}>
      <InlineDatePicker
        className={ClassNames("datepicker", {
          [classNames]: classNames
        })}
        // className={classNames ? classNames : "date-picker"}
        onKeyPress={e => e.preventDefault()}
        onPaste={e => e.preventDefault()}
        keyboard
        variant="outlined"
        color="secondary"
        id={name}
        name={name}
        format={isFormatMonth ? 'YYYY-MM' : 'YYYY-MM-dd'}
        helperText={errors[name]}
        onChange={(dateTime) => {
          //handleInputValidate(name, dateTime);
          if (!handleDateChange) {
            return handleDChange(dateTime, name)
          }
          handleDateChange(dateTime, name, request)
        }}
        label={label ? label : ' '}
        value={state[name]}
      />
    </MuiPickersUtilsProvider>
  )
};

MDatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  handleDateChange: PropTypes.func,
  handleDChange: PropTypes.func,
  classNames: PropTypes.string
}

export default withStyles(null, { withTheme: true })(MDatePicker);
