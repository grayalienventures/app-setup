import { createStore, compose, applyMiddleware, Action, Dispatch, Store } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import reducers, { RootState, IAppState } from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-community/async-storage'

// import { Dispatch } from 'react';
const persistConfig = {
  storage: AsyncStorage,
  key: 'primary',
  whitelist: ['auth']
}

const enhancer = compose(applyMiddleware(
  // @ts-ignore
  thunk as ThunkMiddleware<RootState, Action | Dispatch<Action>>,
));
const persistedReducer = persistReducer(persistConfig, reducers);


export default function configureStore(): Store<IAppState> {
  const store = createStore(persistedReducer, undefined, enhancer);

  return store;
}
const store = configureStore()

const persistor = persistStore(store);

export { store, persistor }
