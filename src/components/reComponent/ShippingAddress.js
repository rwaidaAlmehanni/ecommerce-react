import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography, TextField, FormControl
  ,DialogContent, withStyles} from "@material-ui/core";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
// import { URLS } from "../../utils";

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
  flexDiv: {
    width: '100%',
    display: 'flex',
    marginTop: '1em',
    marginBottom: '1em',
  },
  shippingDiv: {
    width: '33%',
    paddingRight: '0.5em'
  },

});

class ShippingAddress extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    const { classes } = this.props;
    return (
        <div>
          <FormControl fullWidth>
            <TextField label={'Address 1'} value={null}
                       onChange={(event) => {
                         this.setState({address1: event.target.value})
                       }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField label={'Address 2'} value={null}
                       onChange={(event) => {
                         this.setState({address2: event.target.value})
                       }}
            />
          </FormControl>
          <FormControl fullWidth>
            <div className={classes.flexDiv}>
              <div className={classes.shippingDiv}>
                <TextField label={'City'} value={null} type={'password'}
                           onChange={(event) => {
                             this.setState({city: event.target.value})
                           }}
                />
              </div>
              <div className={classes.shippingDiv}>
                <TextField label={'Region'} value={null} type={'password'}
                           onChange={(event) => {
                             this.setState({region: event.target.value})
                           }}
                />
              </div>
              <div className={classes.shippingDiv}>
                <TextField label={'Postal Code'} value={null} type={'password'}
                           onChange={(event) => {
                             this.setState({postalCode: event.target.value})
                           }}
                />
              </div>
            </div>
          </FormControl>
          <FormControl fullWidth>
            <div className={classes.flexDiv}>
              <div className={classes.shippingDiv}>
                <Typography variant={'subtitle1'}> Country</Typography>
                <Select value={null} onChange={(e)=>{console.log('hello')}} fullWidth>
                  <MenuItem children={'test1'} value={1} id={1}/>
                  <MenuItem children={'test2'} value={2} id={2}/>
                </Select>
              </div>
              <div className={classes.shippingDiv}>
                <Typography variant={'subtitle1'}> Shipping Region</Typography>
                <Select value={null} onChange={(e)=>{console.log('hello')}} fullWidth>
                  <MenuItem children={'test1'} value={1} id={1}/>
                  <MenuItem children={'test2'} value={2} id={2}/>
                </Select>
              </div>
              <div className={classes.shippingDiv}>
                <Typography variant={'subtitle1'}> Shipping Options</Typography>
                <Select value={null} onChange={(e)=>{console.log('hello')}} fullWidth>
                  <MenuItem children={'test1'} value={1} id={1}/>
                  <MenuItem children={'test2'} value={2} id={2}/>
                </Select>
              </div>
            </div>
          </FormControl>
        </div>
    );
  }
}

ShippingAddress.propTypes = {

};

export default withStyles(styles)(ShippingAddress) ;