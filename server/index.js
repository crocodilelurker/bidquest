const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const authRouter = require("./routes/authRoutes");
const itemRouter = require("./routes/itemRoutes");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(cors({
    origin: true, // Reflects the request origin, allowing any domain
    credentials: true // Allows cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());
dotenv.config();


app.use("/api/auth", authRouter);
app.use("/api/item", itemRouter);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
