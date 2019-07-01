import React, {Component} from 'react';;
import { Provider } from 'react-redux';
import storeFactory from '../../store';
import LandingPage from "./LandingPage";
import { PersistGate } from 'redux-persist/integration/react';

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
  }

  render() {
    let storeData = storeFactory();
    return (
      <Provider store={storeData.store}>
        <PersistGate loading={null} persistor={storeData.persistor}>
          <LandingPage/>
        </PersistGate>
      </Provider>
    );
  }
}

export default Main;