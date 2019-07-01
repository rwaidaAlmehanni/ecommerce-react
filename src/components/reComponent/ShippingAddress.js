import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Typography, TextField, FormControl
  , DialogContent, withStyles, Button
} from "@material-ui/core";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import $ from "jquery";
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

const api = "https://backendapi.turing.com/";

class ShippingAddress extends Component {
  constructor() {
    super();
    this.state = {
      address1: "",
      address2: "",
      city: "",
      region: "",
      postalCode: "",
      country: null,
      shippingRegion: null,
      shippingOptions: null
    }
    this._onSubmit = this._onSubmit.bind(this)
  }

  _onSubmit(){
    let self = this;
    $.ajax({
      url: api + "customers/address",
      type: "PUT",
      data: this.state,
      success: function(results) { self.setState({totalPrice:results.total_amount}) },
      error: function(error) { console.log('errror',error); }
    });
  }

  render() {
    const { classes } = this.props;
    const { address1, address2, city, region, postalCode, country, shippingRegion, shippingOptions } = this.state;
    return (
      <div>
        <FormControl fullWidth>
          <TextField label={'Address 1'} value={address1}
                     onChange={(event) => {
                       this.setState({address1: event.target.value})
                     }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField label={'Address 2'} value={address2}
                     onChange={(event) => {
                       this.setState({address2: event.target.value})
                     }}
          />
        </FormControl>
        <FormControl fullWidth>
          <div className={classes.flexDiv}>
            <div className={classes.shippingDiv}>
              <TextField label={'City'} value={city} type={'text'}
                         onChange={(event) => {
                           this.setState({city: event.target.value})
                         }}
              />
            </div>
            <div className={classes.shippingDiv}>
              <TextField label={'Region'} value={region} type={'text'}
                         onChange={(event) => {
                           this.setState({region: event.target.value})
                         }}
              />
            </div>
            <div className={classes.shippingDiv}>
              <TextField label={'Postal Code'} value={postalCode} type={'text'}
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
              <Select value={country} onChange={(e)=>{this.setState({country: e.target.value})}} fullWidth>
                <MenuItem children={'test1'} value={1} id={1}/>
                <MenuItem children={'test2'} value={2} id={2}/>
              </Select>
            </div>
            <div className={classes.shippingDiv}>
              <Typography variant={'subtitle1'}> Shipping Region</Typography>
              <Select value={shippingRegion} onChange={(e)=>{this.setState({shippingRegion: e.target.value})}} fullWidth>
                <MenuItem children={'test1'} value={1} id={1}/>
                <MenuItem children={'test2'} value={2} id={2}/>
              </Select>
            </div>
            <div className={classes.shippingDiv}>
              <Typography variant={'subtitle1'}> Shipping Options</Typography>
              <Select value={shippingOptions} onChange={(e)=>{this.setState({shippingOptions: e.target.value})}} fullWidth>
                <MenuItem children={'test1'} value={1} id={1}/>
                <MenuItem children={'test2'} value={2} id={2}/>
              </Select>
            </div>
          </div>
        </FormControl>
        <div>
          <Button children={<b>Submit Address</b>} variant={"contained"} style={{backgroundColor: '#6eb2fb',margin:'1em'}}
                  onClick={()=>{this._onSubmit()}} type="submit"
          />
        </div>
      </div>
    );
  }
}

ShippingAddress.propTypes = {

};

export default withStyles(styles)(ShippingAddress) ;