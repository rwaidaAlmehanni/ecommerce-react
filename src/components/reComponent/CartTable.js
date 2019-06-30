import React, {Component} from 'react';
import {Typography,withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  quantityAction: {
    width: '20px',
    height: '20px',
    margin:'0.5em',
    textAlign:'center',
    cursor: 'pointer',
    backgroundColor: '#f62f5e',
  },
});

const api = "https://backendapi.turing.com/";
class CartTable extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      definition: '',
      isSubmitted: false,
      cartItems: []

    };
  }
  componentDidMount(){
    this.setState({cartItems: this.props.cartItems})
  }

  _removeItem(item){
    $.ajax({
      url: api + "shoppingcart/removeProduct/"+ item.item_id,
      data: {item_id: item.item_id, quantity: item.quantity},
      type: "PUT",
      success: function(resp) {
        console.log('resp',resp)
      },
      error: function(error) { console.log(error); }
    });
  }

  _onUpdate(item,type){
    let self = this;
    if (type === "up"){
      item.quantity+=1
    }else {
      item.quantity-=1
    }
    $.ajax({
      url: api + "shoppingcart/update/"+ item.item_id,
      data: {item_id: item.item_id, quantity: item.quantity},
      type: "PUT",
      success: function(resp) {
        self.setState({cartItems: resp})
      },
      error: function(error) { console.log(error); }
    });
  }

  render() {
    const { classes, cartItems } = this.props;
    return (
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <TableHead>
            <TableRow>
              <TableCell align={'center'}></TableCell>
              <TableCell align={'center'}><b>Name</b></TableCell>
              <TableCell align={'center'}><b>Attributes</b></TableCell>
              <TableCell align={'center'}><b>Price</b></TableCell>
              <TableCell align={'center'}><b>Quantity</b></TableCell>
              <TableCell align={'center'}><b>Subtotal</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((row, index) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.name}
                >
                  <TableCell align="right">
                    <div style={{display:'flex',cursor:'pointer'}}>
                      <CloseIcon style={{color:'#f62f5e'}} onClick={()=>{this._removeItem(row)}}/>
                      <Typography variant={'subtitle1'}>remove</Typography>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.attributes}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    <div style={{display:'flex'}}>
                      <div className={classes.quantityAction} onClick={()=>{
                        if(row.quantity === 1){
                          return null;
                        }else{
                          this._onUpdate(row,'down')}
                      }}>
                        <Typography style={{color:'#fff'}} ><b>{"-"}</b></Typography>
                      </div>
                      <div>{row.quantity}</div>
                      <div className={classes.quantityAction}>
                        <AddIcon style={{color:'#fff',width:'80%'}} onClick={()=>{this._onUpdate(row,'up')}}/>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.subtotal}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

    );
  }
}

CartTable.propTypes = {
  cartItems: PropTypes.array,

}

export default withStyles(styles)(CartTable);





















