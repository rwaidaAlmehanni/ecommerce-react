import React, {Component} from 'react';
import Header from "./reComponent/Header";
import Footer from "./reComponent/Footer";
import SubHeader from "./reComponent/SubHeader";
import ItemsSection from "./reComponent/ItemsSection";
import ProductDialog from "./dialogs/ProductDialog";
import { connect } from 'react-redux';
import {syncAction} from "./actions";
import $ from "jquery";


const api = "https://backendapi.turing.com/";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      openProduct: false,
      products: [],
      attributes: [],
      categories: [],
      departments: [],
      departmentCategories: [],
      productDetails: {},
      productAttributes: {},
    };

    this._onChooseDepartment = this._onChooseDepartment.bind(this)
    this._onChooseCategory = this._onChooseCategory.bind(this)
    this._onChooseProduct = this._onChooseProduct.bind(this)
    this._getAnotherPage = this._getAnotherPage.bind(this)
    this._searchProduct = this._searchProduct.bind(this)

  }

  componentWillMount(){
    //this function will execute just for once before the first render ...
    let self = this;
    $.ajax({
      url: api + "departments/",
      type: "GET",
      success: function(results) { self.setState({departments: results}) },
      error: function(error) { console.log('errror',error); }
    });
    $.ajax({
      url: api + "categories/",
      type: "GET",
      success: function(results) { self.setState({categories:results}) },
      error: function(error) { console.log('errror',error); }
    });
    $.ajax({
      url: api +"products?limit=15",
      type: "GET",
      success: function(results) { self.setState({products:results}) },
      error: function(error) { console.log('errror',error); }
    });
    $.ajax({
      url: api + "attributes/",
      type: "GET",
      success: function(results) { self.setState({attributes:results}) },
      error: function(error) { console.log('errror',error); }
    });
  }

  _addReview(review){
    let self = this
    $.ajax({
      url: api +"/products/"+review.product_id+"/reviews",
      data: review,
      type: "POST",
      success: function(results) { console.log(results) },
      error: function(error) { console.log('errror',error); }
    });

  }

  _getAnotherPage(page){
    let self = this
    $.ajax({
      url: api +"products?page="+ page + "&limit=15",
      type: "GET",
      success: function(results) { self.setState({products:results}) },
      error: function(error) { console.log('errror',error); }
    });
  }

  _onChooseDepartment(department){
    let self = this;
    $.ajax({
      url: api + "categories/inDepartment/"+ department.department_id +'/',
      type: "GET",
      success: function(results) { self.setState({categories: {rows: results} }) },
      error: function(error) { console.log('errror',error); }
    });
    $.ajax({
      url: api + "products/inDepartment/"+ department.department_id +'/',
      type: "GET",
      success: function(results) { self.setState({products:results}) },
      error: function(error) { console.log('errror',error); }
    });
  }

  _onChooseCategory(category){
    let self = this;
    $.ajax({
      url: api+"products/inCategory/"+ category.category_id +'?limit=15',
      type: "GET",
      success: function(results) { self.setState({products:results}) },
      error: function(error) { console.log('errror',error); }
    });
  }

  _onChooseProduct(product){
    this.setState({openProduct: true})
    let self = this;
    $.ajax({
      url: api + "products/" + product.product_id + "/details",
      type: "GET",
      success: function(results) { self.setState({productDetails:results}) },
      error: function(error) { console.log('errror',error); }
    });
    $.ajax({
      url: api + "attributes/inProduct/" + product.product_id,
      type: "GET",
      success: function(results) { self.setState({productAttributes:results}) },
      error: function(error) { console.log('errror',error); }
    });
  }

  _searchProduct(string){
    let self = this;
    let url = api;
    if(string.length > 0){
      url += "products/search?query_string=" + string
    }else{
      url += "products?limit=15"
    }
    $.ajax({
      url: url  ,
      type: "GET",
      success: function(results) { self.setState({products:results}) },
      error: function(error) { console.log('errror',error); }
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({})
  }

  render() {
    const { departments, categories, products, openProduct, productDetails, productAttributes } = this.state;
    const { syncAction, cart, cartItems, token, userProfile } = this.props;
    console.log('token',token)
    return (
      <div style={{maxWidth:'100%',minWidth:'100%',margin:0}}>
        <ProductDialog open={openProduct} onClose={()=>{this.setState({openProduct: false})}}
                       productDetails={productDetails} productAttributes={productAttributes}
                       addReview={this._addReview} syncAction={syncAction} cart={cart}/>
        <Header cartItems={cartItems} cart={cart} syncAction={syncAction} token={token} userProfile={userProfile}/>
        <SubHeader departments={departments} onChooseDepartment={this._onChooseDepartment} searchProduct={this._searchProduct}/>
        <ItemsSection products={products} categories={categories} onChooseProduct={this._onChooseProduct}
                      onChooseCategory={this._onChooseCategory} getAnotherPage={this._getAnotherPage}/>
        <Footer departments={departments} onChooseDepartment={this._onChooseDepartment}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.ecommerceReducer.cart,
    cartItems: state.ecommerceReducer.cartItems,
    token: state.ecommerceReducer.token,
    userProfile: state.ecommerceReducer.userProfile,
  };
};

 const mapDispatchToProps = (dispatch) => ({
  syncAction(type, data) {
    dispatch(
      syncAction(type, data)
    )},

 })


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

