const express = require("express");
require("dotenv").config();
const { validateMovie, validateUser } = require("./validators.js");
const { hashPassword, verifyPassword, verifyToken } = require("./auth");
const app = express();
app.use(express.json());
const port = process.env.APP_PORT ?? 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const isItDwight = (req, res) => {
  if (
    req.body.email === "dwight@theoffice.com" &&
    req.body.password === "123456"
  ) {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
};

// app.post("/api/login", isItDwight);
movieHandlers = require("./movieHandlers");
userHandlers = require("./movieHandlers");
app.get("/", welcome);
app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
app.post("/api/users", hashPassword, userHandlers.postUser);

app.use(verifyToken);

app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", validateUser, userHandlers.postUser);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
