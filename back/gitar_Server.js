const express = require("express");
var cors = require("cors");
const errorMiddleware = require("./middleware/errorHandlers");
const gitarEndpoint = require("./routers/gitar_endpoint.js");
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", (req, res, next) => {
  //console.log(req.body);
  next();
});

app.use("/gitarshop", gitarEndpoint);

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
