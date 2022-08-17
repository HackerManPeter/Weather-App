const path = require("path");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const express = require("express");
const hbs = require("hbs");

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(publicDirPath));
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    developerName: "HackerManPeter",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    developerName: "HackerManPeter",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Send an email",
    developerName: "HackerManPeter",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error)
        return res.send({
          error,
        });
      forecast(longitude, latitude, (error, { weatherDescription } = {}) => {
        if (error) return res.send({ error });
        res.send({
          forecast: `It is ${weatherDescription}`,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "404 Help Page not Found",
    message: "Help article not found",
    developerName: "HackerManPeter",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    title: "404 Page not Found",
    message: "Page not found. Please check the URL and try again.",
    developerName: "HackerManPeter",
  });
});

app.listen(PORT, (_) => {
  console.log(`Server is up on port ${PORT}`);
});
