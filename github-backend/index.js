const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

mongoose
  .connect("mongodb+srv://avdhoot:avdhoot123@cluster0.iuloze3.mongodb.net/github_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
