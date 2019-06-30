/**
 * Created by salalem on 01/10/17.
 */

import { createReducer } from '../utils';
import {
  SAVE_CART,
  CLEAR_CART,
  SAVE_CART_ITEMS,
} from './constants';


const initialState = {
  cart: {},
  cartItems: [],

};

export default createReducer(initialState, {

  [SAVE_CART]: (state, payload) => {
    return Object.assign({}, state, {
      cart: payload,
    });
  },

  [SAVE_CART_ITEMS]: (state, payload) => {
    return Object.assign({}, state, {
      cartItems: payload,
    });
  },

  [CLEAR_CART]: (state) => {
    return Object.assign({}, state, {
      cartItems: [],
    });
  },

});
