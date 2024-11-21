// <------------------------------------------- Imports and Configuration ------------------------------------------------------>

const express = require('express')
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const mongoose = require("mongoose"); // require package
const methodOverride = require('method-override');
const morgan = require('morgan');
const app = express();

// <------------------------------------------- Database Connection------------------------------------------------------>

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

// <------------------------------------------- Controllers ------------------------------------------------------>
// The server now uses MVC architecture, moving the Fruit model interactions from the main server file to a dedicated controller for better code organization
// const Fruit = require("./models/fruit.js");

const fruitsCtrl = require("./controllers/fruits");

// <------------------------------------------- Middleware ------------------------------------------------------>

// Parses incoming request bodies
app.use(express.urlencoded({ extended: false }));

// Enables HTTP method overrides for PUT and DELETE
app.use(methodOverride("_method"));

// Logs HTTP requests and errors
// app.use(morgan("dev"));

// <------------------------------------------- Routes ------------------------------------------------------>


// <---------------------------------------------------------------------- NEW ROUTE/HOME PAGE ---------------------------->
// Home Page


//!! Previous Iteration:
// app.get("/", async (req, res) => {
//     res.render("home.ejs");
//   });

// //!! Refactored:
// <-------- #1 - GET ROUTE
app.get("/", fruitsCtrl.home);


// <---------------------------------------------------------------------- NEW ROUTE/INDEX/ALL FRUITS ---------------------------->


//!! Previous Iteration:
// this displays the '/fruits' route and shows the what is designated by 'template page' 'index2.ejs' (all the fruits as a list)
// app.get('/fruits', async (req, res) => {
//     const allFruits = await Fruit.find()
//     res.render('fruits/index2.ejs', {
//         fruits: allFruits
//     })
// });  


// !! Refactored:
// <------- #2 GET ROUTE
app.get('/fruits', fruitsCtrl.index);

// <---------------------------------------------------------------------- NEW ROUT/CREATE A FRUIT ROUTE --------------------------------->
// This route allows users to create a new fruit and add it to the MongoDB 'fruits' collection.


//!! Previous Iteration:
// app.post('/fruits', async (req, res) => {
//     if(req.body.isReadyToEat === 'on'){
//         req.body.isReadyToEat = true
//     } else {
//         req.body.isReadyToEat = false
//     }
//     await Fruit.create(req.body)
//     res.redirect('/fruits');
//   });


// !! Refactored: 
// <--------- #3 - POST ROUTE
app.post('/fruits', fruitsCtrl.create);


// <---------------------------------------------------------------------- NEW ROUTE/CREATE A FRUIT PAGE ----------------------------------------->
// Renders the 'new.ejs' form to add a new fruit to the database


//!! Previous Iteration:
// app.get("/fruits/new", (req, res) => {
//     res.render("./fruits/new.ejs");
//   }); 


// !! Refactored:
// <--------- #4 - GET ROUTE
app.get('/fruits/new', fruitsCtrl.addNewFruit);

// app.get('/fruits/:fruitId', async (req, res) => {

// <---------------------------------------------------------------------- NEW ROUTE/ SHOW PAGE ----------------------------------------->
// Show page: Displays details for the fruit selected from the '/fruits' page

// !! Previous Iteration:
//   const foundFruit = await Fruit.findById(req.params.fruitId)
//   res.render('fruits/show.ejs', {
//       fruit:foundFruit
//   })
// });


// !! Refactored:
// <--------- #5 - GET ROUTE
app.get('/fruits/:fruitId', fruitsCtrl.showPage);


// <---------------------------------------------------------------------- NEW ROUTE/DELETE A FRUIT ----------------------------------------->
// Delete route: Removes a fruit from index/database

//!! Initial Test Route:
// app.delete('/fruits/:fruitId', (req, res) => {
//   res.send("This is the delete route")
// });

//!! Previous Iteration:
// app.delete('/fruits/:fruitId', async (req, res) => {
//   await Fruit.findByIdAndDelete(req.params.fruitId)
//   res.redirect("/fruits");
// });

//!! Refactored:
// <--------- #6 - DELETE ROUTE
app.delete('/fruits/:fruitId', fruitsCtrl.deleteFruit);


// <---------------------------------------------------------------------- NEW ROUTE/EDIT FRUIT PAGE ----------------------------------------->
// This route renders the 'edit fruit' page and captures the data that is going to be used to update our index and database


//!! Previous Iteration:
// app.get('/fruits/:fruitId/edit', async (req, res) => {
//   const foundFruit = await Fruit.findById(req.params.fruitId)
//   res.render('fruits/edit.ejs', {
//     fruit:foundFruit
//   })
// })

//!! Refactored:
// <--------- #7 - GET ROUTE
app.get('/fruits/:fruitId/edit', fruitsCtrl.editFruit);


// <---------------------------------------------------------------------- NEW ROUTE/UPDATE FRUIT ----------------------------------------->


//!! Previous Iteration:
// app.put('/fruits/:fruitId', async (req, res) => {
//   if(req.body.isReadyToEat === "on"){
//     req.body.isReadyToEat = true
//   } else {
//     req.body.isReadyToEat = false
//   }
//   await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
//   res.redirect('/fruits')
// })

//!! Refactored:
// <--------- #8 - PUT ROUTE
app.put('/fruits/:fruitId', fruitsCtrl.updateFruit);

// <------------------------------------------- Start Server ------------------------------------------------------>
app.listen(3001, () => {
    console.log('Listening on port 3001')
}); 