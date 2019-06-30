import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Paper,withStyles} from "@material-ui/core";
import ItemCard from "./ItemCard";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
// import SearchIcon from "@material-ui/icons/SearchIcon";

const styles = theme => ({
  root: {
    display:'flex',
    backgroundColor:'#f7f7f7',
    width: '98%',
    margin:'0 auto',
    padding:'1em'
  },
  categoriesDiv: {
    width: '10%',
    padding: '1em',
    textAlign: 'center'
  },
  category:{
    cursor: 'pointer',
  },
  productsDiv: {
    display: 'flex',
    width: '85%',
    padding:'3%'
  },
  clickedCategory: {
    cursor: 'pointer',
    color: '#f62f5e'
  },
  hr:{
    margin: '1em',
    opacity: 0.8
  },
  itemDiv: {
    width:'25%',
    padding:'1em',
    cursor: 'pointer'
  }

});

class ItemsSection extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      clickedCategory: null,
    };
  }
  render() {
    const {classes, categories, products, onChooseCategory, onChooseProduct, getAnotherPage} = this.props;
    const {clickedCategory, page} = this.state;
    const pages = Math.ceil(products.count/15);
    return (
      <div className={classes.root}>
        <div className={classes.categoriesDiv}>
          {categories.rows === undefined ? null :
            <div>
              <Typography variant={'h6'} > <b>Categories</b></Typography>
              <hr className={classes.hr}/>
              {categories.rows.map((a) => {
                return (<div onClick={()=>{
                  this.setState({clickedCategory: a})
                  onChooseCategory(a)}}><Typography variant={'subtitle1'} className={!clickedCategory || clickedCategory !== a? classes.category:classes.clickedCategory}>{a.name}</Typography></div>)
              })}
            </div>
          }
        </div>
        {products.rows === undefined ? null :
          <Grid container className={classes.productsDiv}>
            <Grid lg={12} style={{display:'flex',minWidth:'100%',maxWidth:'100%'}}>
              {[...Array(pages).keys()].map((p,i) => {
                return (<Typography variant={'h5'} onClick={()=>{
                  this.setState({ page: p+1 })
                  getAnotherPage(p+1)}} className={classes.category}
                                    style={{ margin:'0.5em', color: page === (p+1) ? '#f62f5e':'#2e2e2e' }}>{ p+1 }</Typography>)
              })}
            </Grid>
            {products.rows.map((p) => {
              return (<Grid lg={2} className={classes.itemDiv} onClick={()=>{onChooseProduct(p)}}><ItemCard product={p}/></Grid>)
            })}
          </Grid>
        }
      </div>
    );
  }
}

ItemsSection.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  onChooseCategory: PropTypes.func,
  onChooseProduct: PropTypes.func,
  getAnotherPage: PropTypes.func,

}

export default withStyles(styles)(ItemsSection);