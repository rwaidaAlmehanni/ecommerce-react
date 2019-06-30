import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography,FormControl,TextField,withStyles} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  root: {
    backgroundColor:'#2e2e2e',
    display: 'flex',
    width: '100%',
    margin:'0 auto'
  },
  shopmateDiv: {
    width: '20%',
    padding:'20px',
    color:"#f62f5e"
  },
  spanColor: {
    color:"#f62f5e",
    cursor: 'pointer'
  },
  defaultColor:{
    color: '#fff',
    cursor: 'pointer'
  },
  ul: {
    display:'flex'
  },
  bagDiv:{
    width: '15%',
    textAlign:'right',
    paddingRight:'10px'
  },
  gbjDiv:{
    width: '20%',
    textAlign:'right',
    backgroundColor: '#fff',
    borderRadius:'30px',
    margin:'0.5em',
    padding: '0.5em'
  },
  ulDiv:{
    width:'50%'
  }

});

class SubHeader extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      definition: '',
      isSubmitted: false,
      clickedDepartment: null,
    }
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
    const { classes, departments, onChooseDepartment, searchProduct } = this.props;
    const { clickedDepartment } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.shopmateDiv}>
          <Typography variant={'h4'}> <b>SHOPMATE</b></Typography></div>
        {departments !== undefined?
          <div className={classes.ulDiv}>
            <ul className={classes.ul}>
              {departments.map((d,i)=>{
                return (<ol className={!clickedDepartment || clickedDepartment !== d? classes.defaultColor : classes.spanColor} onClick={()=>{ this.setState({clickedDepartment:d})
                  onChooseDepartment(d)}}><Typography variant={'h6'}><b>{d.name}</b></Typography></ol>)
              })}
            </ul>

          </div>
          :null}
        <div className={classes.gbjDiv}>
          <FormControl fullWidth >
            <TextField  fullWidth
                        style={{textDecoration: 'none'}}
                        placeholder="Search anything"
                        onChange={(event) =>{searchProduct(event.target.value)}}/>
          </FormControl>
        </div>
        <div style={{padding:'1em'}}><SearchIcon style={{fill:'#fff'}}/></div>
      </div>
    );
  }
}
SubHeader.propTypes = {
  departments: PropTypes.array,
  searchProduct: PropTypes.func,
  onChooseDepartment: PropTypes.func,

}

export default withStyles(styles)(SubHeader);