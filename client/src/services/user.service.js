import axios from 'axios';
import { authHeader } from '../helpers';

export const userService = {
  login,
  loginGoogle,
  logout,
  register,
  getById,
  update,
  getUsers,
  delete:_delete
}

async function login(email,password){
  return await axios.post('/api/users/login', {
    email:email,
    password:password
  });
}

async function loginGoogle(){
  return await axios.post('/api/auth/google');
}

// async function getUser(){
//   return await axios.get('/api/users/me',{
//     headers:authHeader()
//   });
// }

async function getUsers(){
  return await axios.get('/api/users',{
    headers: authHeader()
  });
}

function logout(){
  localStorage.removeItem('user');
}

function getById(id){

}

function register(user){

}

function update(user){

}

function _delete(id){

}

// async function authAdmin(){
//   return await axios.get('/api/users/admin',{
//     headers: authHeader()
//   });
// }