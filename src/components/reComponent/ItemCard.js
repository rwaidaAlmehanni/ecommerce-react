import React, {Component} from 'react';
import {Paper,withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
// import SearchIcon from "@material-ui/icons/SearchIcon";

const styles = theme => ({
  root: {
    width: '100%',
    textAlign:'center',
    padding:'1em'
  },
  itemsDiv: {
    width: '80%',
  },
  h6:{
    padding:'1em'
  },
  subtitle2:{
    padding:'0.5em',
    opacity: 0.8
  },
  priceDiv: {
    width: '100%',
    display: 'flex',
    position:'relative',
    paddingTop:'1em',
    paddingBottom:'1.5em'
  },
  priceDivLeft:{
    position:'absolute',
    float: 'left',
    left:'15px',
    textDecorationLine: 'line-through',
    textDecorationColor: '#f62f5e'
  },
  priceDivRight:{
    backgroundColor: '#f62f5e',
    color: '#fff',
    position:'absolute',
    right:'15px',
    float: 'right',
  },
});

class ItemCard extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      definition: '',
      isSubmitted: false
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
    const {classes, product} = this.props;
    if(product === undefined){
      return null;
    }
    return (
      <div className={classes.root} >
        <Card>
          <Typography variant={'h6'} className={classes.h6}  noWrap>{product.name}</Typography>
          <div >
            <img src={"https://backendapi.turing.com/images/products/"+product.thumbnail}/>
          </div>
          <CardContent>
            <div className={classes.priceDiv}>
              <div className={classes.priceDivLeft}>{"$" + product.discounted_price}</div>
              <div className={classes.priceDivRight}>{"$" + product.price}</div>
            </div>
            <div>
              <Typography variant={'subtitle2'} className={classes.subtitle2} noWrap>
                {product.description}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
ItemCard.propTypes = {
  product: PropTypes.object,
}

export default withStyles(styles)(ItemCard);