import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
dotenv.config();

import "./DB/connection.js";

import { authRoutes } from "./Routes/auth.js";
import { teamRoutes } from "./Routes/Admin/Team.js";
import { articleRoutes } from "./Routes/Admin/Question/ArticleRoutes.js";
import { questionRoutes } from "./Routes/Admin/Question/QuestionRoutes.js";
import { ATDQuestionRoutes } from "./Routes/Admin/Question/ATDQuestionRoutes.js";
import { categoryRoutes } from "./Routes/Admin/Category.js";
import { jwtMiddleware } from "./Middlewares/JwtMiddleware.js";
import { isAdmin } from "./Middlewares/RoleMiddleware.js";

app.use("/auth", authRoutes);
// app.use(jwtMiddleware) //For verifying JWT
// app.use(isAdmin) //For verifying user is admin?

app.use("/admin", teamRoutes);
app.use("/admin", articleRoutes);
app.use("/admin", questionRoutes);
app.use("/admin", categoryRoutes);
app.use("/admin/ATD", ATDQuestionRoutes);

// //Serve static files from the 'uploads' directory
// app.use("/uploads", express.static("uploads"));

// // Use body-parser middleware with increased payload limit
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



app.get("/", (req, res) => {
  res.send("Welcome to Express Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});