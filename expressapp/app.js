const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs"); 
const fs = require("fs"); 
const PartController = require("./controllers/partController.js"); 
const UserController = require("./controllers/userController.js"); 


const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("views"));

const router = express.Router(); 

// logger middleware
app.use(function(request, response, next){
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url}
  ${request.get("user-agent")}`;
  console.log(data);
  fs.appendFile("server.log", data + "\n", function(error){
  if(error) return console.log(error); 
  });
  next();
 });

app.engine("hbs", expressHbs.engine(
  {
    layoutsDir: "views/layouts", 
    defaultLayout: "layout", 
    extname: "hbs"
  }
))
app.set("view engine", "hbs"); 
hbs.registerPartials("./views/partials"); 

// pages routing
app.use("/login", function(_, response){
  response.render("login.hbs");
});


// controller routing
app.use('/api', router); 
// part controller
router.get("/parts", PartController.getParts);
router.get("/parts/search", PartController.searchParts);
router.get("/parts/sort/:column", PartController.sortParts);
router.post("/parts", PartController.addPart);
router.delete("/parts/:id", PartController.deletePart);
router.put("/parts/:id", PartController.editPart);

// user controller 
router.get("/users/:name", UserController.getUserByName); 

 
// default endpoint 
app.use("/", function(_, response){
  response.render("catalog.hbs");
});

// запуск сервера 
app.listen(3000);