import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import MerchantModal from './MerchantModal';
import { Container } from './Containers';
import { ExpandMore } from '@material-ui/icons';
import { ExpansionPanel, ExpansionPanelSummary, Typography, Button, Paper } from '@material-ui/core';


const DescriptionDetailsModal = ({ open, handleClose, details }) => {
  return (
    <MerchantModal
      title="Product Description"
      open={open}
      submitLabel="Ok"
      submitCallback={handleClose}
      handleClose={handleClose}
      children={<Container wantPaper={false}>
        <Paper
          className="p-1"
          dangerouslySetInnerHTML={{ __html: details }}>
        </Paper>
      </Container>}
      width="sm"
    />
  )
}

const CustomExpansionPanel = ({ classes, summary, details, hasButton = false }) => {
  let typographyDetails = (<Typography className={classes.secondaryHeading}>
    {details}
  </Typography>);
  if (hasButton) {
    var [open, useToggleDescModal] = useState(false);
    typographyDetails = <Button variant="outlined" color="secondary" className="pr-1" onClick={() => {
      useToggleDescModal(!open)
    }}>Show Description</Button>
  }
  return (
    <Fragment>
      <ExpansionPanel className="panel">
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography
            className={classes.expansionHeading}>
            {summary}
          </Typography>
          {typographyDetails}
        </ExpansionPanelSummary>
      </ExpansionPanel>
      {hasButton && <DescriptionDetailsModal open={open} details={details} handleClose={() => {
        useToggleDescModal(!open)
      }} />}
    </Fragment>
  )
};


CustomExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  summary: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  hasButton: PropTypes.bool,
  btnProps: PropTypes.object
}

export default CustomExpansionPanel;