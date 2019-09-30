process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require("../models/user");

const chai = require('chai');
const chaiHttp = require('chai-http');
let app = require('../server');
const jwt = require('jsonwebtoken');

let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

chai.use(chaiHttp);

describe('Users', () =>{

    // clean users
    before((done)=>{
      User.deleteMany({},(err)=>{
        done();
      });
    });

    /* GET Users*/
    describe('/GET Users', ()=> {
      it('should not GET all the users w/out jwt', (done) => {
        chai.request(app)
          .get('/api/users')
          .end((err,res) => {
            res.should.have.status(403);
            done();
          });
      });
    }); // GET users

    /* Register User */
    describe('Register new User', ()=>{

      beforeEach((done)=>{
        const newUser = new User({
          name:'ryan',
          email:'ryan@email.com',
          password:'pass123'
        });
        newUser.save((err)=>{
          done();
        });
      });

      afterEach((done)=>{
        User.deleteMany({},(err)=>{
          done();
        });
      });

      it('should fail on missing email', (done)=>{
        let user ={
          name:'',
          email:'',
          password:''
        }
        chai.request(app)
          .post('/api/users/register')
          .send(user)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            done();
          });
      });
      it('should fail on previous email', (done)=>{
        let user ={
          name:'ryan',
          email:'ryan@email.com',
          password:'pass123'
        }
        chai.request(app)
          .post('/api/users/register')
          .send(user)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            done();
          });
      });
    });// register user

    /* Login User */
    describe('Login user', ()=>{
      before((done)=>{
        const newUser = new User({
          name:'ryan',
          email:'ryan@email.com',
          password:'pass123'
        });
        newUser.password = newUser.generateHash(newUser.password);
        newUser.save((err)=>{
          done();
        });
      });

      it('should pass on valid login', (done)=>{
        let req ={
          email:'ryan@email.com',
          password:'pass123'
        }
        chai.request(app)
          .post('/api/users/login')
          .send(req)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            done();
          });
      });

      it('should fail on missing email', (done)=>{
        let req ={
          email:'',
          password:'pass123'
        }
        chai.request(app)
          .post('/api/users/login')
          .send(req)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            done();
          });
      });
      it('should fail on bad password', (done)=>{
        let req ={
          email:'ryan@email.com',
          password:'pass1'
        }
        chai.request(app)
          .post('/api/users/login')
          .send(req)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            done();
          });
      });
    }); // login user

    /* Delete User*/
    describe('Removing a user', ()=>{

      let token1 = '';
      let user = null;

      before((done)=>{
        user = new User({
          name:'ryan',
          email:'ryan@email.com',
          password:'pass123'
        });
        user.password = user.generateHash(user.password);
        user.save((err)=>{
          jwt.sign({user},process.env.JWT_KEY, (err,token)=>{
            token1=token;
            done();
          });
        });
      });


      it('should fail on invalid jwt', (done)=>{
        chai.request(app)
          .delete('/api/users/'+user._id)
          .end((err,res)=>{
            res.should.have.status(403);
            done();
          });
      });

      it('should fail on invalid id', (done)=>{
        chai.request(app)
          .delete('/api/users/'+'fakeid_1234')
          .set({'Authorization': 'Bearer '+ token1.toString()})
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('success').eql(false);
            done();
          });
      });

      it('should fail on bad token', (done)=>{
        chai.request(app)
          .delete('/api/users/'+user._id)
          .set({'Authorization': 'Bearer '+ 'faketoken123'})
          .end((err,res)=>{
            res.should.have.status(403);
            done();
          });
      });
    }); // removing user

    /* PUT User*/
    // describe('Updating a user', ()=>{
    //   it('should fail on invalid token', (done)=>{
    //     assert.fail();
    //     done();
    //   });
    //   it('should pass on valid token', (done)=>{
    //     assert.fail();
    //     done();
    //   });
    // }); // updating user

    /* GET user */
    describe('Get user', ()=>{

      let token1 = '';
      let user = null;

      before((done)=>{
        user = new User({
          name:'ryan',
          email:'ryan@email.com',
          password:'pass123'
        });
        user.password = user.generateHash(user.password);
        user.save((err)=>{
          jwt.sign({user},process.env.JWT_KEY, (err,token)=>{
            token1=token;
            done();
          });
        });
      });


      it('should fail w/out jwt', (done)=>{
        chai.request(app)
          .get('/api/users/'+user._id)
          .end((err,res)=>{
            res.should.have.status(403);
            done();
          });
      });
      it('should fail w/out valid id', (done)=>{
        chai.request(app)
          .get('/api/users/'+'fake_id1234')
          .set({'Authorization': 'Bearer '+ token1.toString()})
          .end((err,res)=>{
            res.should.have.status(403);
            done();
          });
      });
      it('should pass with jwt and good id', (done)=>{
        chai.request(app)
          .get('/api/users/'+user._id)
          .set({'Authorization': 'Bearer '+ token1.toString()})
          .end((err,res)=>{
            res.should.have.status(200);
            done();
          });
      });
    }); // get user by id
});