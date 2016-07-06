var config = {};

config.mongoURI = {
  development: 'ecommerce',
  test: 'ecommerce-test'
}

module.exports = config;


// exporting this object. what is this doing? - relating to product ctrl test file
// when we set NODE_ENV to test, its going to look in the
// config file. its going to look at the object
// and its going to load that string.
// it invokes db, mongojs and passes in the string.
// and then we're switching to a different database.

//we need to differentiate b/t when we are testing
// if the node env is equal to test, itll use an entirely different database.
// that is to avoid duplicates from before.
