import React, { Fragment as F } from 'react';
import PropTypes from 'prop-types';
import { isItemAvailable } from '../../helpers';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';
import { ButtonProps } from '@material-ui/core/Button';
import { Typography, Divider, Button } from '@material-ui/core';


interface HeaderProps extends ButtonProps {
  varia?: ThemeStyle
  label: string
  handleClick?: (event: React.MouseEvent) => any
  dividerClass?: string
  labelColor?: string
  withButton?: boolean
}


const Header = ({ label, handleClick, varia = "h4",
  dividerClass = "divider", labelColor = "",
  withButton = false, ...btnProps }: HeaderProps) => {
  return (
    <F>
      <Typography
        variant={varia}
        className={"d-inline " + (labelColor ? labelColor : '')}
        children={label}
      />
      {
        withButton ?
          <Button
            {...btnProps}
            onClick={handleClick}
            style={{ float: 'right' }}
            color="secondary"
            variant="contained"
            children="Security"
          /> : null
      }
      <Divider
        className={dividerClass}
      />
    </F>
  )
};

Header.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  variant: PropTypes.string,
  dividerClass: PropTypes.string,
  labelColor: PropTypes.string,
  withButton: PropTypes.bool,
  btnProps: PropTypes.object
}


const MyAccountLabel = ({ label, ...rest }) => (
  <Typography
    className="d-inline bold"
    variant="subheading"
    {...rest}
    children={<F>
      {label}
      <span className="float-right">-</span>
    </F>}
    style={{
      width: '100%'
    }}
  />
  // <F>
  //   {label}
  //   <span className="float-right">-</span>
  // </F>
);



interface MyAccountHeader {
  variantLabel: ThemeStyle
  classes: string
  label: string
  item: any
  paddingTop?: number
  classesItem?: string
  separator?: string
  widthLabel?: string
  widthItem?: string
  labelClasses?: string
}



const MyAccountHeader = ({ classes, label, item, paddingTop = 8,
  classesItem = "", separator = '-', widthLabel = "40%",
  widthItem = "55%", variantLabel = "subheading", labelClasses = "d-inline bold" }: MyAccountHeader) => {
  // let widthLabel = null;
  // if (width) {
  //   widthLabel = 100 - width;
  // }

  return (
    <div className={classes ? classes : null}>
      <Typography
        className={labelClasses}
        variant={variantLabel}
        children={<F>
          {label}
          <span className="float-right">{separator}</span>
        </F>}
        style={{
          width: widthLabel
        }}
      />
      <Typography
        style={{
          paddingTop,
          width: widthItem
        }}
        className={`d-inline float-right pt-0 ${classesItem}`}
        variant="subheading"
        children={isItemAvailable(item)}
      />
    </div>
  )
}




MyAccountLabel.propTypes = {
  label: PropTypes.string.isRequired,
}


MyAccountHeader.propTypes = {
  classes: PropTypes.string,
  label: PropTypes.string.isRequired,
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  paddingTop: PropTypes.number,
  width: PropTypes.number
}


export {
  MyAccountHeader,
  MyAccountLabel
}



export default Header;