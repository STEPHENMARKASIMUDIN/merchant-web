import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, CardContent, CardActions, Button } from '@material-ui/core';
import classNames from 'classnames';


interface ReportCardProps {
  btnLabel: string
  classes: {
    reportCard: string
    reportMedia: string
  }
  imgSrc: string
  handleClick: (event: React.MouseEvent) => any
}

const ReportCard = ({ btnLabel, handleClick, imgSrc, classes }: ReportCardProps) => (
  <Card className={classNames(classes.reportCard, 'report-card')}>
    <Grid container justify="center">
      <CardContent>
        <img src={imgSrc} className={classes.reportMedia} alt="Report" />
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary"
          variant="contained"
          onClick={handleClick}>
          {btnLabel}
        </Button>
      </CardActions>
    </Grid>
  </Card>
);


ReportCard.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
  classes: PropTypes.object
}




export default ReportCard;



