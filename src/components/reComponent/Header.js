import React, {Component} from 'react';
import {Typography,withStyles} from "@material-ui/core";
import SignInDialog from "../SignInDialog";
import RegisterDialog from "../RegisterDialog";
import PropTypes from "prop-types";
import ShoppingCart from "@material-ui/icons/ShoppingCart"
import Badge from "@material-ui/core/Badge/Badge";

const styles = theme => ({
  root: {
    backgroundColor:'#f1f1f1',
    display: 'flex',
    width: '100%',
    margin:'0 auto'
  },
  signupDiv: {
    width: '20%',
    padding:'20px',
  },
  spanColor: {
    color:"f62f5e"
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

class Header extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      definition: '',
      openSignUpDialog: false,
      openRegisterDialog: false
    };
    this._onTitleChange = this._onTitleChange.bind(this);
    this._onDefinitionChange = this._onDefinitionChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onTitleChange(event) {
    this.setState({title: event.target.value});
  };

  _onDefinitionChange(event) {
    this.setState({definition: event.target.value});
  };
  _onSubmit() {
    this.setState({isSubmitted: true});
    this.props.onSubmit(this.state.title, this.state.definition);
  };

  render() {
    const {classes, totalCarts} = this.props;
    return (
      <div className={classes.root}>
        <SignInDialog open={this.state.openSignUpDialog}
                      onCancel={() => {
                        this.setState({openSignUpDialog: false})
                      }}/>
        <RegisterDialog open={this.state.openRegisterDialog}
                        onCancel={() => {
                          this.setState({openRegisterDialog: false})
                        }}/>
        <div className={classes.signupDiv}>
          <Typography variant={'h6'}> Hi!
            <span className={classes.spanColor} onClick={()=>{this.setState({openSignUpDialog: true})}}>Sign in </span> or
            <span className={classes.spanColor} onClick={()=>{this.setState({openRegisterDialog: true})}}>Register</span></Typography></div>
        <div className={classes.ulDiv}>
          <ul className={classes.ul}>
            <ol className={classes.defaultColor}><Typography variant={'h6'}><b>Daily Deals</b></Typography></ol>
            <ol className={classes.defaultColor}><Typography variant={'h6'}><b>Sell</b></Typography></ol>
            <ol className={classes.defaultColor}><Typography variant={'h6'}><b>Help & Contact</b></Typography></ol>
          </ul>
        </div>
        <div className={classes.bagDiv}>
          <div style={{width:'50%',textAlign:'right'}}>
            <Badge  badgeContent={totalCarts > 0 ? totalCarts: "O"} style={{color:'#f62f5e'}}>
              <ShoppingCart style={{fill:'#2e2e2e', cursor:'pointer'}}/></Badge>
          </div>
          <div style={{width:'50%'}}>
            <Typography variant={'h6'}> Your bag: <span className={classes.spanColor}>$0.00</span></Typography>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  totalCarts: PropTypes.number,

}

export default withStyles(styles)(Header)