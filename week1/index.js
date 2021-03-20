const express = require("express")
const app = express()
const store = require('./models/inventory')
const mongoose = require('mongoose');


app.use(express.json()) 
// app.use(morgan('dev')) 

//Connect to database
mongoose.connect('mongodb://localhost:27017/storedb', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false
    }, 
    () => console.log("Connected to the database")
)
app.get ("/store", (req,res)=>
{
store.find ((err,items) =>
{
  if (err) 
{
  res.status(500);
  return next(err);
} else {
  return res.status(200).send(items);
}
});
});
// post
app.post("/store", (req,res,next) =>
{
  console.log("red");
  const newItem = new store(req.body);

  newItem.save((err,item) => 
  {
    if (err)
    {res.status (500);
    return next(err);
  } else 
  {return res.status(201).send(item);
  }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})

// Server Listen //
app.listen(9000, () => {
  console.log("The server is running on Port 9000")
})

