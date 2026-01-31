const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const authRouter = require("./routes/authRoutes");
const morgan = require("morgan");

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();


app.use("/api/auth", authRouter)
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
