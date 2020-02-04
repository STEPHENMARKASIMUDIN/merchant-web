import React, { Component } from 'react';
import styles from '../../merchant-theme/styles';
import PropTypes from 'prop-types';
import { IconTooltip } from './IconUpload';
import { Popover, Button as Btn, Typography, withStyles } from '@material-ui/core';





class CustomPopover extends Component {

  state = {
    anchorEl: null
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  handleClick = ({ currentTarget }) => {
    this.setState({
      anchorEl: currentTarget
    })
  }


  render() {
    const { anchorEl } = this.state;
    const { content, btnLabel, isIcon, Icon,
      iconProps, isHover, classes } = this.props;
    const open = !!anchorEl;

    let btn = (
      <Btn fullWidth
        aria-owns={open ? 'mouse-over-popover' : null}
        aria-haspopup="true"
        color="secondary"
        variant="outlined"
        onClick={!isHover ? this.handleClick : null}
        onMouseEnter={isHover ? this.handleClick : null}
        onMouseLeave={isHover ? this.handleClose : null}
        className="font-small">
        {btnLabel}
      </Btn>
    )
    if (isIcon) {
      btn = (
        <IconTooltip
          MIcon={Icon}
          iconClasses={iconProps.classes}
          title={iconProps.title}
        />
      )
    }
    return (
      <div>
        {btn}
        <Popover
          anchorEl={anchorEl}
          open={open}
          className={classes.popover}
          onClose={!isHover ? this.handleClose : null}
          // onMouseEnter={isHover ? this.handleClick : null}
          id="custom-popover"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          disableRestoreFocus
        >
          <Typography
            className="p-2"
            children={content}
          />
        </Popover>
      </div>
    )
  }

}


CustomPopover.propTypes = {
  content: PropTypes.string.isRequired,
  btnLabel: PropTypes.string,
  isHover: PropTypes.bool,
  isIcon: PropTypes.bool,
  Icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func
  ]),
  iconProps: PropTypes.object,
  classes: PropTypes.object
}


export default withStyles(styles)(CustomPopover);