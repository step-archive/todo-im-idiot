let chai = require('chai');
let assert = chai.assert;
let app = require('../app.js');
let request=require('./requestSimulator.js')
const should_be_redirected_to = (res,location)=>{
  assert.equal(res.statusCode,302);
  assert.equal(res.headers.location,location);
};
const status_is_ok = (res)=>assert.equal(res.statusCode,200);
const content_type_is = (res,expected)=> assert.equal(res.headers['Content-Type'],expected);
const body_contains = (res,text)=> assert.isOk(res.body.includes(text),`missing ${text}`);
describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to login.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        should_be_redirected_to(res,'/login.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })
  describe('GET /login.html',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/login.html'},res=>{
        status_is_ok(res);
        content_type_is(res,'text/html');
        body_contains(res,'LOGIN');
        done();
      })
    })
  })
})
