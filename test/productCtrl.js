var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var mongojs = require('mongojs'),
    config = require('../_config');
var db = mongojs(config.mongoURI[process.env.NODE_ENV]), //node environment - sets environment (test, dev, production, etc)
    Products = db.collection('products'),
    ObjectId = mongojs.ObjectId;


var expect = chai.expect;

chai.use(chaiHttp); // do not invoke bc you just need to return the func definitiion

var obj = {
    name: 'stu'
}

var fakeProduct = {
    name: 'Bicycle',
    price: '$5.99',
    description: "A blue bike."
}
var cleanDb = function(done) {
    Products.drop(function(e, r){
        done();
    })
}
describe('productsCtrl', function(){//name, and argument (callback func)
    // all of the tests that will be run

    //before and after each to sanitize the database ~ drops entire db before tests are ran
    before(cleanDb) // passing in the func definition.

    afterEach(cleanDb)

    // each 'it()' is a test. it'll see that the asserts are true.
    it("expects true to equal true", function(){//takes a string first. is used to describe what this test is actually testing. just a description for your benefit. your computer is not doing this. second arg is callback func
        // each expect is called an assert. you're asserting that these will be true
        expect(true).to.equal(!false); //taking in a value, and it's saying if this value does not equal this other value, then the test fails
        expect(2+2).to.equal(4);
        expect(obj.name).to.equal('stu');
    })

    it("expect test function to return foo", function(done){
        chai.request(server)
        .get('/test') // getting test endpoint
        .end(function(err,res){ // callback which will be invoked when we get result back from server. asynchronous operation
            expect(res).to.be.ok; //tests res var to see if there is something there - truthy
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.equal('foo');
            console.log(res.body);
            done();

        })
    })

    it("should make a new product", function(done){
        chai.request(server)
        .post('/products')
        .send(fakeProduct) // havent done this yet, but we're gonna put this for a placeholder
        .end(function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.ok;
            expect(res.body.name).to.equal(fakeProduct.name);
            //done(); //write this so you dont forget to
            expect(res.body._id).to.be.ok;
            var id = res.body._id;

            Products.find({_id: ObjectId(id)}, function(e, r){
                expect(r).to.be.ok;
                console.log(r);
                expect(r[0].name).to.equal(fakeProduct.name);
                done()
            });

        })
    })


    //end describe
})
