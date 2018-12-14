import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    color: 'black'
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={'loading'}>
      <CircularProgress className={classes.progress}  />
      "Loading Inventory"
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);