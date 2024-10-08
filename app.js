var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var localitiesRouter = require("./routes/localityRoutes");
var alertRouter = require("./routes/alertRoutes");
var sensorRouter = require("./routes/sensorRoutes");
var weatherRouter = require("./routes/weatherRoutes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*", // Remplacez par l'URL de votre application React
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Permet les cookies et l'authentification HTTP
  })
);

app.use("/users", usersRouter);
app.use("/localities", localitiesRouter);
app.use("/alerts", alertRouter);
app.use("/sensors", sensorRouter);
app.use("/weathers", weatherRouter);

module.exports = app;
