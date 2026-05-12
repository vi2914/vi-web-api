import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import authRoutes from "./v1/routes/authRoutes.js";
import accountRoutes from "./v1/routes/accountRoutes.js";
import adminRoutes from "./v1/routes/adminRoutes.js";
import sportRoutes from "./v1/routes/sportRoutes.js";

const PORT = 3868;

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3869",
    credentials: true
}));

// setup Routes 

// localhost:3868/api/v1/auth
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/sports', sportRoutes);

app.listen(PORT, () => {
    console.log(`This HTTP app is running on port: ${PORT}`);
});