const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const initRoutes = require("./routes/index");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    methods: "GET, PUT, DELETE, POST",
  })
);
app.use(cookieParser());

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOST_NAME;

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Cuong Boutique API!");
});

initRoutes(app);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
