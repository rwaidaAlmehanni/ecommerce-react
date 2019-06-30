import React, {Component} from 'react';
import Header from "./reComponent/Header";
import Footer from "./reComponent/Footer";
import SubHeader from "./reComponent/SubHeader";
import ItemsSection from "./reComponent/ItemsSection";
import ProductDialog from "./ProductDialog";


const api = "https://backendapi.turing.com/";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      totalCarts: 0,
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
    this._addNewCart = this._addNewCart.bind(this)
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

  _addNewCart(){
    let totalCarts = this.state.totalCarts
    this.setState({totalCarts : totalCarts + 1})
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
      url: api+"products/inCategory/"+ category.category_id +'/',
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

  render() {
    const { departments, categories, products, openProduct, productDetails, productAttributes, totalCarts } = this.state;
    return (
      <div>
        <ProductDialog open={openProduct} onClose={()=>{this.setState({openProduct: false})}}
                       productDetails={productDetails} productAttributes={productAttributes} addNewCart={this._addNewCart}/>
        <Header totalCarts={totalCarts}/>
        <SubHeader departments={departments} onChooseDepartment={this._onChooseDepartment}/>
        <ItemsSection products={products} categories={categories} onChooseProduct={this._onChooseProduct}
                      onChooseCategory={this._onChooseCategory} getAnotherPage={this._getAnotherPage}/>
        <Footer departments={departments}/>
      </div>
    );
  }
}

export default Main;