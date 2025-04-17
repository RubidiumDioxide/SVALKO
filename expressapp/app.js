const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs"); 
const fs = require("fs"); 
const PartController = require("./controllers/partController.js"); 


const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("views"));

const router = express.Router(); 

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

// controller routing 
app.get("/api/parts", PartController.getParts);
app.get("/api/parts/search", PartController.searchParts);
app.post("/api/parts", PartController.addPart);
app.delete("/api/parts/:id", PartController.deletePart);
app.put("/api/parts/:id", PartController.editPart);

// pages routing
app.use("/contact", function(_, response){
  response.render("contact", {
  title: "Мои контакты",
  email: "gavgav@mycorp.com",
  phone: "+1234567890"
  });
});

app.use("/", function(_, response){
  response.render("catalog.hbs");
});

/*router.use("/create", function(request, response){
  response.send("Добавление товара");
 });
router.use("/:id", function(request, response){
  response.send(`Товар ${request.params.id}`);
 });
 router.use("/", function(request, response){
  response.send("Список товаров");
 });

 // сопоставляем роутер с конечной точкой "/products"
 app.use("/products", router);
 app.use("/about", function (request, response) {
  response.send("О сайте");
 });
 app.use("/", function (request, response) {
  response.send("Главная страница");
 });*/

app.listen(3000);