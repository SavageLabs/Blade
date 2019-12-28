import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import RootReducer from './common/reducers/RootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'


const initialState = {};
const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['targets'],
  }


const persistedReducer = persistReducer(persistConfig, RootReducer)


const store = createStore(persistedReducer, initialState, applyMiddleware(...middleware));

export default {store, persistor: persistStore(store)};