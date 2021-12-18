import { combineReducers } from 'redux';

import auth, { AuthState } from './authReducer';


export interface IAppState {
  auth: AuthState
}
const reducers = combineReducers<IAppState>({
  // form:formreducer,
  auth,

});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
// export default reducers;
