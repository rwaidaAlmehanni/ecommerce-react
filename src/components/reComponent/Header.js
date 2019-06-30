import React, {Component} from 'react';
import {Typography,withStyles} from "@material-ui/core";
import SignInDialog from "../dialogs/SignInDialog";
import RegisterDialog from "../dialogs/RegisterDialog";
import PropTypes from "prop-types";
import ShoppingCart from "@material-ui/icons/ShoppingCart"
import Badge from "@material-ui/core/Badge/Badge";
import CartsAndOrderDialog from "../dialogs/CartsAndOrderDialog";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import {CLEAR_AUTH_DATA} from "../constants";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import ProfileDialog from "../dialogs/ProfileDialog";

const styles = theme => ({
  root: {
    backgroundColor:'#f1f1f1',
    display: 'flex',
    width: '100%',
    margin:'0 auto'
  },
  signupDiv: {
    width: '25%',
    display:'flex',
    padding:'20px',
  },
  spanColor: {
    color:"f62f5e",
    cursor: 'pointer'
  },
  defaultColor:{
    color: '#2e2e2e'
  },
  ul: {
    display:'flex'
  },
  bagDiv:{
    display:'flex',
    width: '25%',
    textAlign:'right',
    padding:'10px',
  },
  ulDiv:{
    width:'50%'
  }

});

const api = "https://backendapi.turing.com/";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      definition: '',
      totalPrice: 0.00,
      openProfile: false,
      openCartDialog: false,
      openSignInDialog: false,
      openRegisterDialog: false,
    };
    this._openSignIn = this._openSignIn.bind(this)
    this._openRegister = this._openRegister.bind(this)
    this._onLogOut = this._onLogOut.bind(this)
  }

  _openSignIn(){
    this.setState({openSignInDialog: true})
  }

  _openRegister(){
    this.setState({openRegisterDialog: true})
  }
  componentWillReceiveProps(nextProps){
    let self = this;
    let cart_id = nextProps.cart.cart_id
    $.ajax({
      url: api + "shoppingcart/totalAmount/"+ cart_id,
      type: "GET",
      success: function(results) { self.setState({totalPrice:results.total_amount}) },
      error: function(error) { console.log('errror',error); }
    });
  }

  _onLogOut(){
    const { syncAction } = this.props;
    sessionStorage.removeItem('token');
    syncAction(CLEAR_AUTH_DATA)
  }

  render() {
    const { classes, cartItems, cart, syncAction, token, userProfile } = this.props;
    const { totalPrice, openSignInDialog, openRegisterDialog, openCartDialog, openProfile } = this.state;
    console.log(userProfile.name,'userProfile.name')
    return (
      <div className={classes.root}>
        <ProfileDialog open={openProfile}
                       onCancel={() => {
                         this.setState({openProfile: false})
                       }}
                       userProfile={userProfile}
        />
        <SignInDialog open={openSignInDialog}
                      onCancel={() => {
                        this.setState({openSignInDialog: false})
                      }}
                      openRegister={this._openRegister}
                      syncAction={syncAction}
        />
        <RegisterDialog open={openRegisterDialog}
                        onCancel={() => {
                          this.setState({openRegisterDialog: false})
                        }}
                        openSignIn={this._openSignIn}
                        syncAction={syncAction}
        />
        <CartsAndOrderDialog open={openCartDialog}
                             onCancel={() => {
                               this.setState({openCartDialog: false})
                             }}
                             cart={ cart }
                             totalPrice={ totalPrice }
                             cartItems={ cartItems }
                             syncAction={ syncAction }
        />
        {!token?
          <div className={classes.signupDiv}>
            <Typography variant={'h6'}> Hi!
              <span className={classes.spanColor} onClick={()=>{this._openSignIn()}}>Sign in </span> or
              <span className={classes.spanColor} onClick={()=>{this._openRegister()}}>Register</span></Typography>
          </div>
          :
          <div className={classes.signupDiv}>
            <Typography variant={'h6'}> Hi!</Typography>
            <FormControl style={{marginTop:'-1em',marginLeft:'1em'}}>
              <InputLabel htmlFor="age-simple">{userProfile.name}</InputLabel>
              <Select value={null} inputProps={{ name: userProfile.name,id: '0',}}
                      onChange={(e)=>{
                        if(e.target.value === 10){
                          this.setState({openCartDialog: true})
                        }else if(e.target.value === 20){
                          this.setState({openProfile: true})
                        }else{
                          this._onLogOut()
                        }
                      }}
              >
                <MenuItem children={'My Bag'} value={10} />
                <MenuItem children={'My Profile'} value={20} />
                <MenuItem children={'Logout'} value={30} />
              </Select>
            </FormControl>
          </div>
        }
        <div className={classes.ulDiv}>
          <ul className={classes.ul}>
            <ol className={classes.defaultColor}><Typography variant={'h6'}><b>Daily Deals</b></Typography></ol>
            <ol className={classes.defaultColor}><Typography variant={'h6'}><b>Sell</b></Typography></ol>
            <ol className={classes.defaultColor}><Typography variant={'h6'}><b>Help & Contact</b></Typography></ol>
          </ul>
        </div>
        <div className={classes.bagDiv}>
          <div style={{width:'50%',textAlign:'right'}}>
            <Badge  badgeContent={cartItems && cartItems.length > 0 ? cartItems.length: "O"} style={{color:'#f62f5e'}}>
              <ShoppingCart style={{fill:'#2e2e2e', cursor:'pointer'}} onClick={()=>{this.setState({openCartDialog: true})}}/></Badge>
          </div>
          <div style={{width:'50%'}}>
            <Typography variant={'h6'}> Your bag: <span className={classes.spanColor}>$ {totalPrice}</span></Typography>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  cart: PropTypes.object,
  token: PropTypes.string,
  userProfile: PropTypes.object,
  cartItems: PropTypes.array,
  syncAction: PropTypes.func,
}

export default withStyles(styles)(Header)