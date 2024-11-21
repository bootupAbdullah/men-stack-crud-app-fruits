// controllers/fruits.js
const Fruit = require('../models/fruit');


// <------------------------------------------- HOME PAGE/GET ROUTE------------------------------------------------------>

// Previous Route:

// GET / home page
// app.get("/", async (req, res) => {
//     res.render("index.ejs");
//   });

// <--------- #1 - HTTP METHOD: GET ROUTE
// Refactored:
const home = async (req, res) => {
  res.render("home.ejs");
};


// <------------------------------------------- INDEX PAGE/GET ROUTE ------------------------------------------------------>

// Previous Route:

// app.get('/fruits', async (req, res) => {
//     const allFruits = await Fruit.find() // !! moved to the function below - declared a variable which is set to a mongoDB function 'find'
//     res.render('fruits/index2.ejs', {fruits: allFruits}); // !! moved to the function below 'renders' using an express function ejs file index2 which contains all of our 'fruits' obtained by the mongoDB 'find' function.


// <--------- #2 - HTTP METHOD: GET ROUTE
// Refactored:
const index = async (req, res) => {
  const foundFruits = await Fruit.find();
  res.render('fruits/index2.ejs', { fruits: foundFruits });
};

// <------------------------------------------- HANDLE 'CREATE' REQUEST/POST ROUTE ------------------------------------------------------>

// Handles the request to add a new fruit; saves form data from 'new.ejs' to MongoDB

//Previous Route: 

// app.post('/fruits', async (req, res) => {
//   if(req.body.isReadyToEat === 'on'){
//       req.body.isReadyToEat = true
//   } else {
//       req.body.isReadyToEat = false
//   }
//   await Fruit.create(req.body)
//   res.redirect('/fruits');
// });

// <--------- #3 - HTTP METHOD: POST ROUTE

//Refactored:
const create = async (req, res) => {
  if(req.body.isReadyToEat === 'on'){
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.create(req.body)
  res.redirect('/fruits')
};

// <------------------------------------------- ADD NEW FRUIT PAGE/POST ROUTE  ------------------------------------------------------>

// Renders a form to create a new fruit; submits data to the corresponding POST route to save in MongoDB

// Previous Route:
// app.get("/fruits/new", (req, res) => {
//     res.render("./fruits/new.ejs");
//   }); 

// <--------- #4 - HTTP METHOD: GET ROUTE
// Refacotred:
const addNewFruit = async (req, res) => {
  res.render('./fruits/new.ejs')
};


// <------------------------------------------- SHOW PAGE FOR SELECTED FRUIT/GET ROUTE ------------------------------------------------------>

// Previous Route:
// app.get('/fruits/:fruitId', async (req, res) => {
//   const foundFruit = await Fruit.findById(req.params.fruitId)
//   res.render('fruits/show.ejs', {
//       fruit:foundFruit
//   })
// });

// <--------- #5 - HTTP METHOD: GET ROUTE
// Refactored:
const showPage = async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId)
  res.render('fruits/show.ejs', {fruit: foundFruit})
}

// <------------------------------------------- DELETE FRUIT/DELETE ROUTE ------------------------------------------------------>

// Previous Route:
// app.delete('/fruits/:fruitId', async (req, res) => {
//   await Fruit.findByIdAndDelete(req.params.fruitId)
//   res.redirect("/fruits");
// });

// <--------- #6 - HTTP METHOD: DELETE ROUTE
// Refactored:
const deleteFruit = async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId)
  res.redirect('/fruits')
}


// <------------------------------------------- EDIT FRUIT PAGE/GET ROUTE ------------------------------------------------------>

//Renders 'Edit A Fruit Page' to the client

// Previous Route:
// app.get('/fruits/:fruitId/edit', async (req, res) => {
//   const foundFruit = await Fruit.findById(req.params.fruitId)
//   res.render('fruits/edit.ejs', {
//     fruit:foundFruit
//   })
// })

// <--------- #7 - HTTP METHOD: GET ROUTE
const editFruit = async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId)
  res.render('fruits/edit.ejs', {fruit:foundFruit})
}


// <--------------------------------------------UPDATE FRUIT/PUT ROUTE ------------------------------------------------------>

//Previous Route:
// app.put('/fruits/:fruitId', async (req, res) => {
//   if(req.body.isReadyToEat === "on"){
//     req.body.isReadyToEat = true
//   } else {
//     req.body.isReadyToEat = false
//   }
//   await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
//   res.redirect('/fruits')
// })

// <--------- #8 - HTTP METHOD: PUT ROUTE
const updateFruit = async (req, res) => {
  if(req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
  res.redirect('/fruits')
}


module.exports = {
  index,
  home,
  create,
  addNewFruit,
  showPage,
  deleteFruit,
  editFruit,
  updateFruit,
};

// !! just checked route and it works!




