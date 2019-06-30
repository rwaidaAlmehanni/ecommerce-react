import React, {Component} from 'react';
import {Typography,withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    backgroundColor:'#2e2e2e',
    textAlign:'center',
    width: '100%',
    margin:'0 auto'
  },
  flexDiv: {
    margin:0,
    width: '100%',
    display: 'flex',
    paddingBottom:'1em'
  },
  spanColor: {
    color:"f62f5e"
  },
  defaultColor:{
    color: '#fff'
  },
  partDiv: {
    width: '20%',
    textAlign: 'center'
  },
  bagDiv:{
    width: '15%',
    textAlign:'right',
    paddingRight:'10px'
  },
  gbjDiv:{
    width: '10%',
    textAlign:'right'
  },
  sideDiv:{
    width: '35%'
  },
  ulDiv:{
    width: '100%',
    display: 'flex',
    textAlign: 'center',
  }

});

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      definition: '',
      isSubmitted: false
    };
  }
  render() {
    const { classes, departments } = this.props;
    return (
      <div className={classes.root}>
        {departments !== undefined ?
          <div className={classes.ulDiv}>
            <div className={classes.sideDiv}/>
            <div>
              <ul className={classes.ulDiv}>
                {departments.map((d,i)=>{
                  return ( <ol className={classes.defaultColor} style={{textAlign:'center'}}><Typography variant={'h6'}><b>{d.name}</b></Typography></ol>)})}
              </ul>
            </div>
            <div className={classes.sideDiv}/>
          </div>
          :null}
        <div>
        </div>
        <div className={classes.flexDiv}>
          <div className={classes.partDiv}/>
          <div className={classes.partDiv}>
            <Typography style={{display:'flex'}} variant={'h6'} className={classes.defaultColor}>
              <b>©</b>2019 Shopmate Ltd
            </Typography>
          </div>
          <div className={classes.partDiv}>
            <Typography variant={'h6'} className={classes.defaultColor}>Contact</Typography>
          </div>
          <div className={classes.partDiv}>
            <Typography variant={'h6'} className={classes.defaultColor}>Privacy policy</Typography>
          </div>
          <div className={classes.partDiv}/>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  departments: PropTypes.array,

}

export default withStyles(styles)(Footer);
