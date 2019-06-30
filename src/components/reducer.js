/**
 * Created by salalem on 01/10/17.
 */

import { createReducer } from '../../utils/index';
import {
  SAVE_CART,
  CLEAR_CART,
  SAVE_CART_ITEMS,
  SAVE_AUTH_DATA,
  CLEAR_AUTH_DATA,
} from './constants';


const initialState = {
  cart: {},
  cartItems: [],
  token: null,
  userProfile: {}
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

  [SAVE_AUTH_DATA]: (state, payload) => {
    return Object.assign({}, state, {
      token: payload.accessToken,
      userProfile: payload.customer,
    });
  },

  [CLEAR_AUTH_DATA]: (state) => {
    return Object.assign({}, state, {
      token: null,
      userProfile: {},
    });
  },

});
