const express = require("express");
var cors = require("cors");
const errorMiddleware = require("./middleware/errorHandlers");
const gitarEndpoint = require("./routers/gitar_endpoint.js");
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  //res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "*");
  res.append("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/gitarshop", gitarEndpoint);

app.use(errorMiddleware);
// app.use(function (req, res, next) {
//   res.status(500).json({
//     error: "server error",
//   });
// });
app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
