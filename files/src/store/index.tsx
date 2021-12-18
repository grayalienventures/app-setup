import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import reducers from '../reducers/index';
const persistConfig = {
  key: 'root',
  storage:AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
    persistedReducer,
    {},
    compose(
        applyMiddleware(thunk),

    )
);

// store.subscribe(mapStoreToStorage);
persistStore(
  store,
  null, () => {
    store.getState() // if you want to get restoredState
  }
)
export default store