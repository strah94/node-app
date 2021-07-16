const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mySql = require("./config/db");
const cors = require("cors");

//Check connection
mySql.getConnection((err, conn) => {
  err ? console.log("error") : console.log("connected");
});

//Init middleware for req.body
app.use(express.json({ extended: false }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/mail", require("./routes/mail"));
app.use("/api/resetPassword", require("./routes/resetPassword"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
