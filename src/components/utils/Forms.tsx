import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import { onlyAllowDigits, disableCopyP, countries, toCurrency, onlyMoney } from '../../helpers';
import { MerchantFormFieldProps, MerchantFormProps, InputFormMoneyProps } from './../../helpers/merchantTypes';
import {
  FormControl, InputLabel, OutlinedInput, TextField, InputAdornment, IconButton, Tooltip, Select, MenuItem
} from '@material-ui/core';



const styleTextHelper = {
  margin: '9px 0px 0px 0px'
}

const passwordIconStyle = {
  paddingRight: '0 !important'
}



// const iconProps = {
//   InputProps: {
//     inputPropsStyle: { padding: 0 }
//   },
//   IconProps: {
//     child: { paddingRight: 14 }
//   }
// }


const MerchantFormField = (props: MerchantFormFieldProps) => {
  const { label, name, handleChange, Icon,
    isEmail, IconProps, InputProps, error, IsPassword, passwordProps,
    isText, isSmall, isShrink, isNormal, allowDigitsOnly,
    disableCopyPaste, classes, variant = 'outlined',
    disabled, convertToMoney = false, value, allowMoneyFormat = false, ...rest } = props;

  let height: number | null = null;
  let endAdornment = Icon ? <Icon /> : null;
  const hasError: boolean | string = error[name];
  const colorIcon = 'rgba(0, 0, 0, 0.75)'; //hasError ? '#d50000' : 'rgba(0, 0, 0, 0.85)';
  //
  if (hasError) {
    height = 65;
  } else if (isSmall) {
    height = 45;
  }
  // height : isSmall ? 45 : error[name] ? 65 : null
  height = isNormal ? null : height;
  if (InputProps) {
    var { inputPropsStyle, inputPropsClasses, maxLength, minLength } = InputProps;
  }
  if (typeof Icon === 'function') {
    //style={parent ? { parent } : null}
    //var { parent, child } = IconProps;
    endAdornment = (
      <InputAdornment position="end">
        <Icon style={{ paddingRight: 14, color: colorIcon }} />
      </InputAdornment>);
  }
  else if (typeof Icon === 'string') {
    endAdornment = (
      <InputAdornment variant="filled" position="end" >
        <div className="pr-1" >
          {Icon}
        </div>
      </InputAdornment>);
  }
  if (IsPassword) {
    var { showPassword, handleShowPassword } = passwordProps;
    endAdornment = (<InputAdornment variant="filled" position="end" >
      <Tooltip title={!showPassword ? "Show Password" : "Hide Password"}>
        <IconButton onClick={handleShowPassword}>
          {showPassword ? <Visibility
            style={passwordIconStyle} /> : <VisibilityOff
              style={passwordIconStyle} />}
        </IconButton></Tooltip>
    </InputAdornment>)
  }

  const type: string = isEmail ? 'email' : isText ? 'text' : (!showPassword ? 'password' : 'text');
  return (
    <TextField
      style={{
        height
      }}
      disabled={disabled ? disabled : false}
      className={classes ? classes : null}
      label={label ? label : null}
      name={name}
      id={name}
      variant={variant}
      onBlur={handleChange}
      onChange={handleChange}
      onKeyPress={allowDigitsOnly ? onlyAllowDigits : allowMoneyFormat ? onlyMoney : null}
      onPaste={disableCopyPaste ? disableCopyP : null}
      error={hasError ? true : false}
      helperText={hasError ? hasError : false}
      InputLabelProps={{
        className: (isSmall && disabled ? 'small text-black' : isSmall ? 'small' : null),
      }}
      inputProps={{
        maxLength: maxLength ? maxLength : null,
        minLength: minLength ? minLength : null,
        style: {
          padding: isSmall ? '14px 14px' : '18.5px 14px'
        }
      }}
      InputProps={{
        className: inputPropsClasses ? inputPropsClasses : null,
        style: { padding: 0, backgroundColor: disabled ? '#cecece' : null },
        // maxLength: maxLength ? maxLength : null,
        endAdornment,
      }}
      FormHelperTextProps={{
        style: styleTextHelper,
        className: 'error-helper-text'
      }}
      type={type}
      value={convertToMoney ? toCurrency(value) : value}
      {...rest}
      required
      fullWidth
    />
  )
}


interface IconPropsO {
  Icon: any
  isStart?: boolean
}
interface MerchantTextAreaProps {
  labelName?: string
  name: string
  classes?: string
  error: any
  IconProps?: IconPropsO | string
  [rest: string]: any
  handleChange: any
}

const MerchantTextArea = ({ labelName = "", name, classes = "", error, IconProps = "", handleChange, ...rest }: MerchantTextAreaProps) => {
  let IconEl = null
  if (IconProps) {
    var { Icon, isStart = false } = IconProps as IconPropsO;
    IconEl = (<InputAdornment position="end">
      <Icon />
    </InputAdornment>);
  }


  return (
    <TextField
      fullWidth
      className={classes}
      type="text"
      multiline
      onChange={handleChange}
      onBlur={handleChange}
      error={error[name] ? true : false}
      helperText={error[name] ? error[name] : null}
      variant="outlined"
      label={labelName ? labelName : null}
      name={name}
      id={name}

      FormHelperTextProps={{
        style: styleTextHelper
      }}

      InputProps={{
        startAdornment: isStart ? IconEl : null,
        endAdornment: !isStart ? IconEl : null,

      }}
      {...rest}
    />
  )
};


const InputFormMoney = (props: InputFormMoneyProps) => {
  let { label, value, withSymbol = true, isDisabled = false,
    isAutoFocus = true, adornmentProps,
    size = "large", InputPropsClasses = "", name, formatValue = true,
    errors = {},
    ...rest } = props;
  let formattedVal = value, hasError = false, style = {};
  if (formatValue) {
    formattedVal = value ? toCurrency(value, withSymbol) : '0.00';
  }

  if (size == "small") {
    style = {
      height: 45
    }
    adornmentProps = {
      style: {
        paddingLeft: 15
      }
    }
  }



  if (errors[name]) {
    hasError = true;
    style = {
      height: 65
    }
  }
  return (
    <TextField
      autoFocus={isAutoFocus}
      disabled={isDisabled}
      style={style}
      name={name}
      id={name}
      {...rest}
      onPaste={disableCopyP}
      value={formattedVal}
      onKeyPress={onlyMoney}
      variant="outlined"
      label={label}
      InputProps={{
        className: `text-black ${InputPropsClasses}`,
        startAdornment: <InputAdornment
          {...adornmentProps}
          position="start"
          children="₱" />
      }}
      error={hasError}
      helperText={hasError && errors[name]}
    />
  )
}






class MerchantForm extends Component<MerchantFormProps> {

  state = {
    labelWidth: 0
  }

  labelRef: React.ReactInstance

  componentDidMount() {
    this.setState({
      labelWidth: findDOMNode(this.labelRef)['offsetWidth']
    })
  }

  countries = [...countries];


  CountriesMenus = () => {
    return (
      this.countries.map(o => (
        <MenuItem key={o} value={o} >
          {o}
        </MenuItem>
      )))
  }



  render() {
    let { isOutlined, isRequired, name, label,
      value, onChange, classes, error, isSmall, ...rest } = this.props;
    const { labelWidth } = this.state;

    return (
      <FormControl
        className={classes ? classes : ''}
        fullWidth
        variant={isOutlined ? 'outlined' : 'filled'}
        required={isRequired ? true : false}
        style={{
          height: 45
        }
        }
      >
        <InputLabel
          htmlFor={name}
          ref={ref => this.labelRef = ref}
          children={label}
          className="small"
        />
        <Select
          error={error[name] ? true : false}
          {...rest}
          value={value}
          onChange={onChange}
          SelectDisplayProps={{
            style: {
              padding: isSmall ? '14.5px 14px' : '18.5px 14px'
            }
          }}
          input={
            <OutlinedInput
              required
              labelWidth={labelWidth} name={name}
              id={name} />
          }>
          {this.CountriesMenus()}
        </Select>
        {/* {
            isOutlined ?
              <OutlinedInput
                onChange={onChange}
                name={name}
                id={name}
                value={value}
                labelWidth={labelWidth}
                type={!type ? "text" : type}
              />
              : <FilledInput
                value={value}
                onChange={onChange}
                name={name}
                id={name}
                type={!type ? "text" : type}
              />
          } */}
      </FormControl>
    )
  }
};





export { MerchantForm, MerchantTextArea, MerchantFormField, InputFormMoney };