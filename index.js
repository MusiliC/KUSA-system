const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/static", express.static("uploads"));

app.use(fileUpload());

require("dotenv").config();

app.use("/user", require("./routes/userRoutes"));
app.use("/regions", require("./routes/region.routes"));
app.use("/teams", require("./routes/teamRoutes"));
app.use("/events", require("./routes/eventRoutes"));
app.use("/scorer", require("./routes/scoresRoutes"));
app.use("/results", require("./routes/resultsRoutes"));
app.use("/fixtures", require("./routes/fixtureRoutes"));

const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo db connection established");
  })
  .catch((error) => {
    console.error("Mongodb connection failed:", error.message);
  });
