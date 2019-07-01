import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography, Button, TextField, FormControl,
  DialogContentText, DialogContent,
  DialogTitle, Dialog, withStyles} from "@material-ui/core";
import {SAVE_AUTH_DATA} from "../constants";
import $ from "jquery";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  title: {
    color: '#2e2e2e',
    opacity: 0.9,
    paddingTop: '1em'
  },
  centerAlign: {
    textAlign: 'center'
  },
  buttonDiv: {
    marginTop: '1em',
    textAlign:'center'
  },
  button: {
    backgroundColor: '#f62f5e',
    color: '#fff'
  },
  bottomText: {
    display: 'flex',
    paddingTop: '1em'
  },
  bottomSubText: {
    color: '#6eb2fb',
    paddingLeft: '0.5em',
    cursor: 'pointer'
  },
  passwordFlexDiv: {
    width: '100%',
    display: 'flex'
  },
  passwordDiv: {
    width: '50%',
    paddingRight: '0.5em'
  },
  closeIcon: {
    float:'right',
    right:'15px',
    top:'5px',
    marginBottom:'1em',
    position:'absolute',
    cursor:'pointer'
  }

});
const api = "https://backendapi.turing.com/";

class RegisterDialog extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: "",
      confirmPassword: ""
    }
    this._onSubmit = this._onSubmit.bind(this)
  }
  _onSubmit(){
    let self = this
    const { email, password, name } = this.state;
    const { syncAction, onCancel } = this.props;
    $.ajax({
      url: api + "customers",
      data: {name: name, email: email, password: password, },
      type: "POST",
      success: function(resp) {
        sessionStorage.setItem('token', resp.accessToken);
        syncAction(SAVE_AUTH_DATA,resp)
        onCancel()
      },
      error: function(error) { console.log('errorrrrrrrr',error); }
    });
  }

  render() {
    const { classes, onCancel, open, openSignIn } = this.props;
    const { email, password, name, confirmPassword } = this.state;
    return (
      <Dialog open={open} onClose={onCancel} maxWidth={'xs'}>
        <div className={classes.closeIcon} onClick={onCancel}><CloseIcon/></div>
        <DialogTitle children={<Typography variant={'h4'}><b className={classes.title}>{"Register"}</b></Typography>}
                     className={classes.centerAlign}/>
        <DialogContent >
          <DialogContentText children={ '*All fields are required!' }
                             className={classes.centerAlign}/>
          <div>
            <FormControl fullWidth>
              <TextField label={'Name*'} value={name}
                         onChange={(event) => {
                           this.setState({name: event.target.value})
                         }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField label={'Email*'} value={email}
                         onChange={(event) => {
                           this.setState({email: event.target.value})
                         }}
              />
            </FormControl>
            <FormControl fullWidth>
              <div className={classes.passwordFlexDiv}>
                <div className={classes.passwordDiv}>
                  <TextField label={'Password*'} value={password} type={'password'}
                             onChange={(event) => {
                               this.setState({password: event.target.value})
                             }}
                  />
                </div>
                <div className={classes.passwordDiv}>
                  <TextField label={'Confirm Password*'} value={confirmPassword} type={'password'}
                             onChange={(event) => {
                               this.setState({confirmPassword: event.target.value})
                             }}
                  />
                </div>
              </div>
            </FormControl>
            <div className={classes.buttonDiv}>
              <Button children={<b>Submit</b>} variant={"contained"} className={classes.button}
                      onClick={this._onSubmit} type="submit"
              />
            </div>
            <Typography variant={'subtitle1'} className={classes.bottomText}>Do you have an account?
              <Typography className={classes.bottomSubText}
                          onClick={()=>{
                            onCancel()
                            openSignIn()}}><b>Sign up</b>
              </Typography>
            </Typography>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

RegisterDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  openSignIn: PropTypes.func,
  syncAction: PropTypes.func,

};

export default withStyles(styles)(RegisterDialog) ;