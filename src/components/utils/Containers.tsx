import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { GridJustification } from '@material-ui/core/Grid';


interface ContainerProps {
  children: JSX.Element | JSX.Element[]
  classes?: string
  isChildContainer?: boolean
  wantPaper?: boolean
  hasDefaultClasses?: boolean
  parentSize?: number
  parentJustify?: GridJustification
  [rest: string]: any
}



const Container = (props: ContainerProps) => {
  const { children, classes,
    isChildContainer = false, wantPaper = true, hasDefaultClasses = true, parentSize = 12, parentJustify, ...rest } = props;
  return (
    <Grid item container
      xs={parentSize}
      justify={parentJustify ? parentJustify : null}
      className={hasDefaultClasses ? `mt-2 pr-2 pl-2 ${classes ? classes : null}` : classes ? classes : null} >
      <Grid item xs={12} container={isChildContainer ? true : false}
        {...rest}
        className={wantPaper ? 'paper' : null}>
        {children}
      </Grid>
    </Grid>
  )
};


interface GridContainerProps {
  children?: any[]
  splitByTwos?: boolean
  splitByThrees?: boolean
  splitByFours?: boolean
  changeSize?: number
}




const GridContainer = (props: GridContainerProps) => {

  let { children, splitByTwos = false, splitByThrees = false, splitByFours = false, changeSize = 0 } = props;
  let size = null;
  if (splitByTwos) {
    size = 6;
  } else if (splitByThrees) {
    size = 4;
  } else if (splitByFours) {
    size = 3;
  }
  else if (splitByThrees && splitByTwos) {
    size = null;
  }
  if (children === null || children === undefined) {
    return null;
  }

  if (changeSize) {
    size = changeSize;
  }



  if (!children.length) {
    return (
      <Grid item xs={12}>
        {children}
      </Grid>
    )
  }
  return (
    children.map((el, i): JSX.Element => (
      <Grid item key={i} xs={size}>
        {el}
      </Grid>
    ))
  )
};



interface CenterProps {
  children?: JSX.Element | JSX.Element[]
  justify?: GridJustification
  classes?: string
  wantPaper?: boolean
  [rest: string]: any
}


const Center = (props: CenterProps) => {
  const { children, justify = "center", classes, wantPaper = false, ...rest } = props;
  const paperClass = wantPaper ? 'paper' : null;
  return (
    <Grid item container justify={justify}
      className={`${paperClass} ${classes ? classes : null}`} {...rest} >
      {children}
    </Grid>
  )
};

const children = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object,
])

Container.propTypes = {
  children,
  classes: PropTypes.string,
  isChildContainer: PropTypes.bool,
  wantPaper: PropTypes.bool,
  hasDefaultClasses: PropTypes.bool,
  parentSize: PropTypes.number,
  parentJustify: PropTypes.string,
  rest: PropTypes.object
}


// GridContainer.propTypes = {
//   children,
//   splitByTwos: PropTypes.bool,
//   splitByThrees: PropTypes.bool,
//   splitByFours: PropTypes.bool,
//   changeSize: PropTypes.oneOfType([
//     PropTypes.number,
//     PropTypes.string
//   ])
// }


// Center.propTypes = {
//   children,
//   justify: PropTypes.string,
//   classes: PropTypes.string,
//   props: PropTypes.object
// }

export {
  Container,
  Center,
  GridContainer
}
