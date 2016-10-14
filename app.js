var koa = require("koa");
var app = module.exports = koa();
var routes = require("koa-route");

// routes
var userRoutes = require("./userRoutes");
app.use(routes.post("/user", userRoutes.addUser));
app.use(routes.get("/user/:id", userRoutes.getUser));
app.use(routes.put("/user/:id", userRoutes.updateUser));
app.use(routes.del("/user/:id", userRoutes.deleteUser));

app.listen(4000);
console.log("The app is listening. Port 4000");

