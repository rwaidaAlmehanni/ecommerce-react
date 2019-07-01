import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography, Button, TextField, FormControl,
  DialogContentText, DialogContent,
  DialogTitle, Dialog, withStyles} from "@material-ui/core";
import {SAVE_AUTH_DATA} from "../constants";
import CloseIcon from "@material-ui/icons/Close";
import $ from "jquery";

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
  closeIcon: {
    float:'right',
    right:'15px',
    top:'5px',
    marginBottom:'1em',
    position:'absolute',
    cursor:'pointer',
  }

});

const api = "https://backendapi.turing.com/";
class SignInDialog extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    }
    this._onSubmit = this._onSubmit.bind(this)
  }
  _onSubmit(){
    let self = this
    const { email, password } = this.state;
    const { syncAction } = this.props;
    $.ajax({
      url: api + "customers/login",
      data: {email: email, password: password},
      type: "POST",
      success: function(resp) {
        sessionStorage.setItem('token', resp.accessToken);
        syncAction(SAVE_AUTH_DATA,resp)
      },
      error: function(error) { console.log(error); }
    });
  }

  render() {
    const { classes, onCancel, open, openRegister } = this.props;
    const {email, password} = this.state;
    return (
      <Dialog open={open} onClose={onCancel} maxWidth={'xs'}>
        <div className={classes.closeIcon} onClick={onCancel}><CloseIcon/></div>
        <DialogTitle children={<Typography variant={'h4'}><b className={classes.title}>{"Sign In"}</b></Typography>}
                     className={classes.centerAlign}/>
        <DialogContent >
          <DialogContentText children={ '*All fields are required!' }
                             className={classes.centerAlign}/>
          <form>
            <FormControl fullWidth>
              <TextField label={'Email*'} value={email}
                         onChange={(event) => {
                           this.setState({email: event.target.value})
                         }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField label={'Password*'} value={password} type={'password'}
                         onChange={(event) => {
                           this.setState({password: event.target.value})
                         }}
              />
            </FormControl>
            <div className={classes.buttonDiv}>
              <Button children={<b>Submit</b>} variant={"contained"} className={classes.button}
                      onClick={this._onSubmit} type="submit"
              />
            </div>
            <Typography variant={'subtitle1'} className={classes.bottomText}>Don't have an account?
              <Typography className={classes.bottomSubText}
                          onClick={()=>{
                            onCancel()
                            openRegister()}}><b>Register</b>
              </Typography>
            </Typography>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

SignInDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  syncAction: PropTypes.func,
  openRegister: PropTypes.func,
};

export default withStyles(styles)(SignInDialog) ;