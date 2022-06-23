const express = require("express");
const userSchema = require("../models/user.model");

const app = express();

app.get("/home", (req, res) => {
  res.status(200).send("<h1> Hello World <h1>");
});

app.post("/users", (req, res) => {
  const user = userSchema.create(req.body);

  res.status(200).json(user);
});

const port = 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}!`));
