import { combineReducers } from  'redux';
import user from './user/reducer';
import register from './register/reducer';
import login from './login/reducer';
import profile from './profile/reducer';

const IndexReducer = combineReducers({
  register,
  login,
  user,
  profile
});

export default IndexReducer;