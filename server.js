const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();

db.mongoose.connect(db.url,{ useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{ console.log("Connected to the database!");})
            .catch(err => {
                console.log("Cannot connect to the database!", err);
                process.exit();
              });

var corsOptions = {
    origin : "https://localhost:8081" 
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/",(req,res)=>{
 res.json({message:"Hola Node!"});
});

require("./app/routes/student.route")(app);

const port = process.env.PORT || 8081;
app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
})
