const express = require('express')
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const mongoose = require("mongoose"); // require package
const methodOverride = require('method-override');
const morgan = require('morgan');
const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


// !! Middleware

// Import the Fruit model
const Fruit = require("./models/fruit.js");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// app.use(morgan("dev"));



// server.js

// GET / renders the the show page
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });


// this displays the '/fruits' route and shows the what is designated by 'template page' 'index2.ejs' (all the fruits as a list)
app.get('/fruits', async (req, res) => {
    const allFruits = await Fruit.find()
    res.render('fruits/index2.ejs', {
        fruits: allFruits
    })
});  


// POST /fruits - this is a route for the fruits to be added to the list - the end point of this route is the specified fruit being added to the mongodb 'fruits' object
app.post('/fruits', async (req, res) => {
    if(req.body.isReadyToEat === 'on'){
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }
    await Fruit.create(req.body)
    res.redirect('/fruits');
  });

  // GET /fruits/new - this renders the page that allows you to add a new fruit to the database/list, the 'template page' is 'new.ejs'
app.get("/fruits/new", (req, res) => {
    res.render("./fruits/new.ejs");
  }); 


// this the 'show' page - which displays a page for each specific fruit - the fruit displayed is the fruit that is clicked on by the user on the '/fruits' page 
app.get('/fruits/:fruitId', async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId)
  res.render('fruits/show.ejs', {
      fruit:foundFruit
  })
});

//this route is set up to delete fruits from the list, this 'tests' that the route is working by sending a message to the 'end' of the route
// app.delete('/fruits/:fruitId', (req, res) => {
//   res.send("This is the delete route")
// });

// I have copied the above route from line 67-70 as means to recognize and remember that there was first an attempt to 'set up' the delete route by simply sending a messae to the end of the route to make sure that it works correctly.
app.delete('/fruits/:fruitId', async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId)
  res.redirect("/fruits");
});


app.get('/fruits/:fruitId/edit', async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId)
  res.render('fruits/edit.ejs', {
    fruit:foundFruit
  })
})

app.put('/fruits/:fruitId', async (req, res) => {
  if(req.body.isReadyToEat === "on"){
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
  res.redirect('/fruits')
})

app.listen(3001, () => {
    console.log('Listening on port 3001')
}); 