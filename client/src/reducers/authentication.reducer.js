import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? {loggedIn: true, user}: {};

export default function(state = initialState, action){
  switch(action.type){
    case userConstants.LOGIN_REQUEST:
      return{
        ...state,
        user: action.payload
      };
    case userConstants.LOGIN_SUCCESS:
      return{
        ...state,
        loggedIn: true,
        user: action.payload
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
      
    case userConstants.REGISTER_REQUEST:
      return {};
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return{};
    default:
      return state;
  }
}