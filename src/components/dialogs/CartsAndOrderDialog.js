import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography, Button, TextField, FormControl,
  DialogContentText, DialogContent,
  DialogTitle, Dialog, withStyles} from "@material-ui/core";
import CartTable from "./reComponent/CartTable";
import ShippingAddress from "./reComponent/ShippingAddress";
import {CLEAR_CART} from "../constants";
// import { URLS } from "../../utils";

const styles = theme => ({
  root: {
    padding: '3em',
    margin: '1em'
  },
  centerAlign: {
    textAlign: 'center'
  },
  buttonDiv: {
    width: '20%',
    textAlign:'center'
  },
  button: {
    backgroundColor: '#f62f5e',
    color: '#fff'
  },
  divFlex: {
    width:'100%',
    display: 'flex',
    padding: '1em'
  },
  divTotalText: {
    color: '#f62f5e',
    width: '60%',
    textAlign:'center'
  }

});

const api = "https://backendapi.turing.com/";

class CartsAndOrderDialog extends Component {
  constructor() {
    super();
    this.state = {
      orderPlace: false,
      doOrder: false,
    }
    this._onDelete = this._onDelete.bind(this)
    this._doOrder = this._doOrder.bind(this)
  }

  _onDelete(){
    const { cart, syncAction } = this.props;
    $.ajax({
      url: api + "shoppingcart/empty/"+ cart.cart_id,
      type: "DELETE",
      success: function(resp) {
        syncAction(CLEAR_CART)
        console.log('resp',resp)
      },
      error: function(error) { console.log(error); }
    });
  }

  _doOrder(){
    let self = this
    const { cart } = this.state;
    $.ajax({
      url: api + "shoppingcart/empty/"+ cart.cart_id,
      type: "DELETE",
      success: function(resp) {
        console.log('resp',resp)
      },
      error: function(error) { console.log(error); }
    });
  }

  render() {
    const { classes, onCancel, open, cartItems, totalPrice } = this.props;
    const { orderPlace, doOrder } = this.state;
    return (
      <Dialog open={open} onClose={onCancel} maxWidth={'xl'} className={classes.root}>
        { !orderPlace ? null:
          <DialogTitle children={<Typography variant={'h4'}><b className={classes.title}>{"Shipping Address"}</b></Typography>}
                       className={classes.centerAlign}/>
        }
        <DialogContent >
          { !orderPlace &&  !doOrder?
            <div>
              <div className={classes.divFlex}>
                <div className={classes.buttonDiv}>
                  <Button children={<b>Empty cart</b>} variant={"contained"} className={classes.button}
                          onClick={this._onDelete} type="submit"
                  />
                </div>
                <div className={classes.divTotalText}><Typography variant={'h6'}>Total: $ {totalPrice}</Typography></div>
                <div className={classes.buttonDiv}>
                  <Button children={<b>Place order</b>} variant={"contained"} className={classes.button}
                          onClick={()=>{this.setState({ orderPlace: true, doOrder:false })}} type="submit"
                  />
                </div>
              </div>
              <CartTable cartItems={cartItems}/>
            </div>
            : orderPlace &&  !doOrder?
              <div>
                <div className={classes.divFlex}>
                  <div className={classes.buttonDiv}>
                    <Button children={<b>back to cart</b>} variant={"contained"} className={classes.button}
                            onClick={()=>{this.setState({ orderPlace: false, doOrder: false })}} type="submit"
                    />
                  </div>
                  <div className={classes.divTotalText}/>
                  <div className={classes.buttonDiv}>
                    <Button children={<b>Do order</b>} variant={"contained"} className={classes.button}
                            onClick={()=>{this.setState( {doOrder: true, orderPlace:false })}} type="submit"
                    />
                  </div>
                </div>
                <ShippingAddress/>
              </div>
              : !orderPlace &&  doOrder?
                <div>
                  <div className={classes.divFlex}>
                    <div style={{margin:'1em'}}>
                      <Button children={<b>back to cart</b>} variant={"contained"} className={classes.button}
                              onClick={()=>{this.setState({ orderPlace: false, doOrder: false })}} type="submit"
                      />
                    </div>
                    <div style={{margin:'1em'}}>
                      <Button children={<b>back to order place</b>} variant={"contained"} className={classes.button}
                              onClick={()=>{this.setState( {orderPlace: true, doOrder:false })}} type="submit"
                      />
                    </div>
                  </div>
                  <div className={classes.divFlex}>
                    <div>
                      <TextField placeholder={'Card Number'}/>
                    </div>
                    <div>
                      <Button children={<b>Submit Payment</b>} variant={"contained"} style={{backgroundColor: '#6eb2fb',margin:'1em'}}
                              onClick={()=>{this.setState( {orderPlace: true, doOrder:false })}} type="submit"
                      />
                    </div>
                  </div>
                </div>
                :null
          }
        </DialogContent>
      </Dialog>
    );
  }
}

CartsAndOrderDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  syncAction: PropTypes.func,
  cartItems: PropTypes.array,
  totalPrice: PropTypes.number,
  cart: PropTypes.object,

};

export default withStyles(styles)(CartsAndOrderDialog) ;