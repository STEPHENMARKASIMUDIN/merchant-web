import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Grid, StyledComponentProps } from '@material-ui/core';

interface ContainerProps {
  children: ReactNode
  classes: StyledComponentProps
}

const Container = ({ children, classes }: ContainerProps) => {
  return (
    <Grid item container
      className={`mt-4 pr-3 pl-3 ${classes ? classes : null}`} >
      <Grid item xs={12} className="paper">
        {children}
      </Grid>
    </Grid>
  )
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  classes: PropTypes.string
}


export default Container;
