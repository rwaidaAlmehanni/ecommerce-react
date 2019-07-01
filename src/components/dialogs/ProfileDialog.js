import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography, FormControl, DialogContent,
  DialogTitle, Dialog, withStyles} from "@material-ui/core";

const styles = theme => ({
  dialogTitle: {
    textAlign: 'center'
  },
  title: {
    color: '#f62f5e',
    paddingTop: '1em'
  },
});
const api = "https://backendapi.turing.com/";

class ProfileDialog extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    const { classes, onCancel, open, userProfile } = this.props;
    return (
      <Dialog open={open} onClose={onCancel} maxWidth={'sm'}>
        <DialogTitle children={<Typography variant={'h5'} className={classes.dialogTitle}><b>{"Simple Profile"}</b></Typography>}
                     className={classes.centerAlign}/>
        <DialogContent >
          <div>
            <FormControl fullWidth>
              <Typography variant={'h6'} className={classes.title}>Name</Typography>
              <Typography variant={'subtitle1'}>{userProfile.name}</Typography>
            </FormControl>
            <FormControl fullWidth>
              <Typography variant={'h6'} className={classes.title}>Email</Typography>
              <Typography variant={'subtitle1'}>{userProfile.email}</Typography>
            </FormControl>
            <FormControl fullWidth>
              <Typography variant={'h6'} className={classes.title}>Address 1</Typography>
              <Typography variant={'subtitle1'}>{userProfile.address_1}</Typography>
            </FormControl>
            <FormControl fullWidth>
              <Typography variant={'h6'} className={classes.title}>Address 2</Typography>
              <Typography variant={'subtitle1'}>{userProfile.address_2}</Typography>
            </FormControl>
            <FormControl fullWidth>
              <Typography variant={'h6'} className={classes.title}>City</Typography>
              <Typography variant={'subtitle1'}>{userProfile.city}</Typography>
            </FormControl>
            <FormControl fullWidth>
              <Typography variant={'h6'} className={classes.title}>Region</Typography>
              <Typography variant={'subtitle1'}>{userProfile.region}</Typography>
            </FormControl>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

ProfileDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  userProfile: PropTypes.object,

};

export default withStyles(styles)(ProfileDialog) ;