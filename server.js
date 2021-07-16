const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mySql = require("./config/db");

//Check connection
mySql.getConnection((err, conn) => {
  err ? console.log("error") : console.log("connected");
});

//Init middleware for req.body
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/users"));
// app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
