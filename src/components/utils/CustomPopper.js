import React from 'react';
import PropTypes from 'prop-types';
import { GridContainer, Center } from './Containers';
import { Popper, Grow, Typography, Button, Paper } from '@material-ui/core';

const CustomPopper = ({ anchorEl, confirmCallback, label,
  showPopUp,
  handleTogglePopOver, placement = "bottom-start", ...rest }) => {

  return (
    <Popper
      {...rest}
      placement={placement}
      anchorEl={anchorEl}
      open={showPopUp} transition>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} timeout={350}>
          <Paper>
            <Typography className="p-1 title">{label}</Typography>
            <Center spacing={8}>
              <GridContainer splitByTwos>
                <Button children="Yes"
                  onClick={(e) => {
                    handleTogglePopOver(e);
                    confirmCallback();
                  }}
                  variant="contained" color="secondary" />
                <Button children="No"
                  onClick={handleTogglePopOver}
                  variant="contained" />
              </GridContainer>
            </Center>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
};


CustomPopper.propTypes = {
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element
  ]),
  confirmCallback: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  showPopUp: PropTypes.bool.isRequired,
  handleTogglePopOver: PropTypes.func.isRequired,
  rest: PropTypes.object
}

export default CustomPopper;