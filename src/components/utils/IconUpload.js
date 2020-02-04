import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton, Tooltip, Zoom, Icon, withStyles } from '@material-ui/core';
import { connect } from 'react-redux'

const styles = theme => ({
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: `${theme.palette.text.black} !important`,
    boxShadow: theme.shadows[1],
    fontSize: 14,
  }
})

let IconBtnToolTip = ({ isDarkTheme, title, placement, name, onIconClick, children, iconBtnClasses = '', classes }) => {
  //const tooltip = isDarkTheme ? classes.lightTooltip : '';
  return (
    <Tooltip title={title}
      placement={placement ? placement : "bottom-start"} TransitionComponent={Zoom}>
      <IconButton
        className={iconBtnClasses}
        onClick={onIconClick}
        component="label"
        name={name}
        children={children}>
      </IconButton>
    </Tooltip>
  )
};
const IconUpload = ({ Icon, handleChangeFile, label = "",
  name, placement = null, classes = "",
  toolTipTitle = 'Only jpg, png, jpeg, docx and pdf are the allowed extensions.',
  acceptPattern = "image/*,.pdf" }) => {

  return (
    <Fragment>
      <label htmlFor={name}>
        <IconBtnToolTip
          title={toolTipTitle}
          placement={placement}
          name={name}
          children={<Fragment>
            <div>
              <input type="file" className="d-none"
                id={name}
                name={name}
                onChange={handleChangeFile}
                accept={acceptPattern ? acceptPattern : null}
              />
              <Icon />
            </div>
          </Fragment>}
        />
        {/* <Tooltip title={toolTipTitle}
          placement={placement ? placement : "bottom-start"} TransitionComponent={Zoom}>
          <IconButton
            component="label"
            name={name}
            children={
              <Fragment>
                <div>
                  <input type="file" className="d-none"
                    id={name}
                    name={name}
                    onChange={handleChangeFile}
                    accept={acceptPattern ? acceptPattern : null}
                  />
                  <Icon />
                </div>
              </Fragment>
            }>
          </IconButton>
        </Tooltip> */}
      </label>
      <p className={classes ? classes : "mb-1 mt-0 d-inline"}>{label}</p>
    </Fragment >
  )
};


IconUpload.propTypes = {
  Icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func
  ]),
  handleChangeFile: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placement: PropTypes.string,
  classes: PropTypes.string
}



const IconTooltip = ({ title, MIcon, iconClasses, linkProps = {}, handleClick, isLink = false }) => {

  let children = <MIcon
    className={iconClasses ? iconClasses : null} />;

  if (isLink) {
    const { to } = linkProps;
    children = (
      <Icon component={
        props => <Link {...props} />}
        to={to} >
        <MIcon
          className={iconClasses ? iconClasses : null} />
      </Icon>
    )
  };
  return (
    <Tooltip
      className="tooltip"
      onClick={handleClick ? handleClick : null}
      title={title}>
      {children}
    </Tooltip>
  )
}

IconTooltip.propTypes = {
  MIcon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func
  ]),
  title: PropTypes.string.isRequired,
  iconClasses: PropTypes.string,
  linkProps: PropTypes.object,
  isLink: PropTypes.bool,
  handleClick: PropTypes.func
}





IconBtnToolTip = connect(({ toggle }) => ({ isDarkTheme: toggle.isDarkTheme }))(withStyles(styles, { withTheme: true })(IconBtnToolTip))




export {
  IconTooltip,
  IconBtnToolTip
}


export default IconUpload;

