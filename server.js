var bodyParser = require('body-parser');
var cors = require("cors");
var connection = require("./models/db.js");
var fs = require("fs");
var https = require("https")

var express = require('express')
var app = express().use('*', cors());

var factoryRouter = require("./routes/orders.routes.js");


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var allowCrossDomain = function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	res.header("Access-control-Headers", "Content-Type, Origin, X-Requested-With, Accept, Authorization, Upgrade-Insecure-Requests");
	next();
}

app.use(allowCrossDomain);
app.use('/api', factoryRouter);
//app.use('/mqtt', mqttRouter);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "OnlyFactories BD Port!" });
});

/*

//Query Start for finding an Order by orderID.
app.get('/api/tracking/:id', (req, res) => {
  const orderID = req.params.id;

  if(orderID != null){
    connection.query(`SELECT * from FactoryOrders WHERE orderID = ${orderID}`, function(err,results,fields){
      if(err) throw err;

      console.log(results);
      res.json(results);
      return;
    });
  }
})
//Query END

//Query Start for finding an Order by orderID.
app.get('/api/orderQuantities/:dataRange', (req, res) => {
  const dateRange = req.params.dataRange;
  
  let currentDate = new Date();
  let endDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-'
                  + currentDate.getDate() + ' ' + currentDate.getHours() + ':'
                  + currentDate.getMinutes() + ':' + currentDate.getSeconds();

  let beginDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-'
  + (currentDate.getDate()-dateRange) + ' ' + currentDate.getHours() + ':'
  + currentDate.getMinutes() + ':' + currentDate.getSeconds();

  if(dateRange != null){
    connection.query(`SELECT SUM(quantityRED) FROM FactoryOrders WHERE created_at BETWEEN \"${beginDate.toString()}\" AND \"${endDate.toString()}\"`, function(err,results,fields){
      if(err) throw err;

      console.log(results);
      res.json(results);
      return;
    });
  }
})
//Query END

//Query Start for finding MAX orderID.  
app.get('/api/getMaxOrderID', (req, res) => {

    connection.query(`SELECT MAX(orderID) as orderID from FactoryOrders`, function(err,results,fields){
      if(err) throw err;

      console.log(results);
      res.json(results);
      return;
    });
})
//Query END

//Query Start for finding MAX transactionID.  
app.get('/api/getMaxTransactionID', (req, res) => {

  connection.query(`SELECT MAX(transactionID) as transactionID from FactoryOrders`, function(err,results,fields){
    if(err) throw err;

    console.log(results);
    res.json(results);
    return;
  });
})
//Query END

//Query Start for creating an order. 
app.post('/api/ordering', (req, res) => {
  
  //set keys/map for request body
  var{orderID, fullName, email, quantityRED, quantityBLUE, quantityWHITE, orderStatus, transactionID, created_at, updated_at} = req.body;

  //define map and set to records array
  var records = [[req.body.orderID, req.body.fullName, req.body.email, req.body.orderStatus, req.body.transactionID, req.body.quantityRED, req.body.quantityBLUE, req.body.quantityWHITE, req.body.created_at, req.body.updated_at]];
  
  //check if submitted request was empty
  //query database if not empty
  if(records[0][0]!=null){
    connection.query("INSERT INTO FactoryOrders (orderID, fullName, email, orderStatus, transactionID, quantityRED, quantityBLUE, quantityWHITE, created_at, updated_at) VALUES ?", [records], function(err,res,fields){
      
      //if there is an error querying database, throw error
      if(err) throw err;

      console.log(res);
    });
  }
  //return message and data received from query
  res.json('Order received');
  res.json(records);
})
//Query END

*/

//probably move all routing queries to this location in the future, 
//as API expands
//require("./routes/orders.routes.js")(app);

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//     TO RUN EXPRESS SERVER LOCALLY, COMMENT OUT CODE BELOW AND UNCOMMENT CODE AT BOTTOM
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

/*

// set port, listen for requests
const PORT = process.env.PORT || 3306;
https.createServer({
	key: fs.readFileSync("/etc/letsencrypt/live/onlyfactories.duckdns.org/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/onlyfactories.duckdns.org/cert.pem"),
	},
	app).listen(PORT,  function(){
		console.log("Running on port 3306");
});

*/

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//     TO RUN EXPRESS SERVER LOCALLY, UNCOMMENT CODE BELOW AND COMMENT OUT LISTEN ABOVE
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


// set port, listen for requests
const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//     MAKE SURE TO CHANGE BACK COMMENTS TO LIVE SERVER BEFORE PUSHING
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////