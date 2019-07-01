import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography, Button, TextField, FormControl,
  DialogContent, DialogTitle, Dialog, withStyles} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import {SAVE_CART, SAVE_CART_ITEMS} from "../constants";
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
    paddingLeft: '0.5em'
  },
  attributeFlexDiv: {
    width: '100%',
    display: 'flex'
  },
  attributeColor: {
    width: '20px',
    height: '20px',
    margin:'0.5em',
    textAlign:'center',
    cursor: 'pointer',
    border: '0.5px solid #2e2e2e',
  },
  attributeSize: {
    width: '40px',
    margin:'0.5em',
    textAlign:'center',
    cursor: 'pointer',
    border:'0.5px solid #f62f5e',
  },
  productDiv: {
    width: '100%',
    display: 'flex',
    padding: '1em',
    overflow: 'auto'
  },
  imgDiv: {
    width: '30%',
    padding:'1em',
    textAlign:'center'
  },
  descriptionDiv: {
    width: '70%',
    padding:'1em',
    textAlign:'left'
  },
  priceDiv: {
    width: '100%%',
    display: 'flex',
    position:'relative',
    paddingTop:'1em',
    paddingBottom:'1.5em'
  },
  priceDivLeft:{
    position:'absolute',
    float: 'left',
    left:'15px',
    color:'#f62f5e',
    textDecorationLine: 'line-through',
    textDecorationColor: '#f62f5e'
  },
  priceDivRight: {
    backgroundColor: '#f62f5e',
    color: '#fff',
    position:'absolute',
    right:'50px',
    padding:'0.2em',
    float: 'right',
  },
  reviewDiv:{
    width: '100%',
    textAlign:'center',
    borderRadius:'2px',
    border: '0.5px solid #2e2e2e',
    padding: '0.5em'
  },

});
const api = "https://backendapi.turing.com/";

class ProductDialog extends Component {
  constructor() {
    super();
    this.state = {
      review: "",
      reviewStars: {
        0: 'fill',
        1: 'empty',
        2: 'empty',
        3: 'empty',
        4: 'empty'
      },
      cart: null,
      color: "",
      size: "",
      disabled: false,
    }

    this._AddItemToCart = this._AddItemToCart.bind(this)
    this._createCart = this._createCart.bind(this)
    this._addAttribute = this._addAttribute.bind(this)
    this._reviewRate = this._reviewRate.bind(this)
    this._getRating = this._getRating.bind(this)
  }

  _addAttribute(a){
    let attr = this.state.attributes
    attr+= ("," + a.toLowerCase())
    this.setState({attributes: attr})
  }

  _reviewRate(index){
    let stars = this.state.reviewStars;
    Object.keys(stars).map((s,i)=>{
      if(i <= index){
        stars[s] = 'fill'
      }else{
        stars[s] = 'empty'
      }
    })
    this.setState({reviewStars: stars})
  }

  _getRating(){
    let count = 0;
    let stars = this.state.reviewStars;
    Object.keys(stars).map((s,i)=>{
      if(stars[s] = 'fill') {
        count += 1
      }
    })
    return count
  }

  _AddItemToCart(cart){
    let self = this;
    const { productDetails, syncAction } = this.props;
    const { color, size } = this.state;
    $.ajax({
      url: api + "shoppingcart/add",
      data: {cart_id: cart.cart_id, product_id: productDetails[0].product_id, attributes: color + "," + size},
      type: "POST",
      success: function (res) {
        syncAction(SAVE_CART_ITEMS, res)
        self.setState({disabled: true})
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  _createCart(){
    const { syncAction, cart } = this.props;
    /* if there is no cart created yet create one */
    console.log('there is a cart',cart)
    if(Object.keys(cart).length === 0) {
      $.ajax({
        url: api + "shoppingcart/generateUniqueId",
        type: "GET",
        success: function (res) {
          console.log('there is a cart2',res)
          syncAction(SAVE_CART, res)
          this._AddItemToCart(res)
        },
        error: function (error) {
          console.log(error);
        }
      });
    }else {
      this._AddItemToCart(cart)
    }
  }

  render() {
    const {classes, onClose, open,  productDetails, productAttributes, addReview} = this.props;
    const { review, size, color, disabled, reviewStars } = this.state;
    console.log('productAttributes',productAttributes)
    if(productDetails[0] === undefined){
      return null;
    }
    return (
      <Dialog open={open} onClose={onClose} maxWidth={'md'}>
        <DialogTitle children={<Typography variant={'h4'}><b className={classes.title}>{productDetails[0].name}</b></Typography>}
                     className={classes.centerAlign}/>
        <DialogContent >
          <div className={classes.productDiv}>
            <div className={classes.imgDiv}>
              <img src={"https://backendapi.turing.com/images/products/"+ productDetails[0].image}/>
              <hr/>
              <div style={{height:'50px'}}>
                <img src={"https://backendapi.turing.com/images/products/"+ productDetails[0].image} height={'100%'}/>
                <img src={"https://backendapi.turing.com/images/products/"+ productDetails[0].image_2} height={'100%'}/>
              </div>
            </div>
            <div className={classes.descriptionDiv}>
              <div className={classes.priceDiv}>
                <div className={classes.priceDivLeft}>{"$" + productDetails[0].discounted_price}</div>
                <div className={classes.priceDivRight}>{"$" + productDetails[0].price}</div>
              </div>
              <div>
                <Typography variant={'subtitle2'} className={classes.subtitle2} noWrap>
                  {productDetails[0].description}
                </Typography>
              </div>
              <div>
                <Typography variant={'subtitle2'} className={classes.subtitle2} noWrap>
                  Colors
                </Typography>
                {productAttributes === undefined || Object.keys(productAttributes).length === 0 ? null :
                  <div className={classes.attributeFlexDiv}>
                    {productAttributes.map((a,i)=>{
                      if(a.attribute_name === 'Color'){
                        return (
                          <div style={{backgroundColor: a.attribute_value.toLowerCase(),
                            border: color === a.attribute_value.toLowerCase() ? '2px solid #f62f5e':'0.5px solid #f62f5e'}}
                               className={classes.attributeColor}
                               onClick={() => {
                                 this.setState({color: a.attribute_value.toLowerCase()})}}>
                          </div>
                        )
                      }else{
                        return null
                      }
                    })}
                  </div>
                }
              </div>
              <div>
                <Typography variant={'subtitle2'} className={classes.subtitle2} noWrap>
                  Sizes
                </Typography>
                {productAttributes === undefined || Object.keys(productAttributes).length === 0 ? null:
                  <div className={classes.attributeFlexDiv}>
                    {productAttributes.map((a,i)=>{
                      if(a.attribute_name === 'Size'){
                        return (
                          <div className={classes.attributeSize} style={{backgroundColor: size === a.attribute_value ? '#f62f5e':'#fff'}}
                               onClick={()=>{this.setState({size:a.attribute_value})}}>{a.attribute_value}</div>
                        )
                      }else{
                        return null}
                    })}
                  </div>
                }
              </div>
              <div className={classes.buttonDiv}>
                <Button children={<b>Add to cart</b>} variant={"contained"} className={classes.button}
                        onClick={this._createCart} type="submit" disable={disabled}
                />
              </div>
            </div>
          </div>
          <form>
            <div style={{padding:'1em',textAlign:'center'}}>
              <Typography variant={'h6'} style={{opacity:'0.7',paddingBottom:'1em'}}> Leave a review</Typography>
              <div className={classes.reviewDiv}>
                <FormControl fullWidth>
                  <TextField value={review}
                             onChange={(event) => {
                               this.setState({review: event.target.value})
                             }}
                  />
                </FormControl>
              </div>
            </div>
            <div style={{display:'flex',paddingLeft:'2em'}}>
              {Object.keys(reviewStars).map((r,i)=> {
                if(reviewStars[r] === 'fill')
                  return (<StarIcon style={{color:'#f62f5e'}} onClick={()=>this._reviewRate(i)}/>)
                else
                  return (<StarBorder style={{color:'#f62f5e'}} onClick={()=>this._reviewRate(i)}/>)
              })}
            </div>
            <div className={classes.buttonDiv}>
              <Button children={<b>leave review</b>} variant={"contained"} className={classes.button}
                      type="submit" onClick={()=>{addReview({ product_id: productDetails[0].product_id,
                review:review,
                rating:this._getRating()})}}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

ProductDialog.propTypes = {
  open: PropTypes.bool,
  cart: PropTypes.object,
  productDetails: PropTypes.object,
  productAttributes: PropTypes.object,
  onClose: PropTypes.func,
  addReview: PropTypes.func,
  syncAction: PropTypes.func,

};

export default withStyles(styles)(ProductDialog) ;