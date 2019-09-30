import { userConstants } from '../constants';
import { history } from '../helpers';
import { userService } from '../services';
// import {alertActions} from './';

export const userActions = {
  login,
  logout,
  register,
  delete: _delete
};


function login(email, password){
  return dispatch => {
    //dispatch(request({email}));

    userService.login(email,password)
    .then(res => {
      const user = res.data;
      if(user.token){
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(success(user));
        history.push('/');
      }
      else if(user.success === false){
        dispatch(failure(user.msg));
        // dispatch(alertActions.error("Incorrect login"));

        //history.push('/login');
      }
    },
    error => {
      dispatch(failure(error.toString()));
    //   dispatch(alertActions.error(error.toString()));
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  };

  function request(user){ return {type: userConstants.LOGIN_REQUEST, payload:user}}
  function success(user){ return {type:userConstants.LOGIN_SUCCESS, payload: user}}
  function failure(error){return {type: userConstants.LOGIN_FAILURE, payload: error}}
}

function logout(){
  userService.logout();
  return {type: userConstants.LOGOUT};
}

function register(user){
  //axios call
  //redirect

  function request(user){}
  function success(user){}
  function failure(error){}
}


function _delete(id){
  //axios call
  //redirect

  function request(id){}
  function success(id){}
  function failure(id,error){}
}