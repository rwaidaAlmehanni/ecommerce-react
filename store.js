import appReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const consoleMessages = store => next => action => {
  let result;
  console.groupCollapsed(`dispatching action => ${action.type}`);
  console.log('current state ', store.getState());
  result = next(action);
  let stateResult = store.getState();
  console.log('next state ', stateResult);
  console.groupEnd();
  return result;
};

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk, consoleMessages));
  let persistor = persistStore(store);
  return { store, persistor };
}
