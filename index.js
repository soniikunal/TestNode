import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(
  cors({
    origin: ["http://localhost:5173",
  "http://192.168.0.9:5173"],
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
import { PrescreeningTestRoutes } from "./Routes/Test/Prescreening.js";
import { jwtMiddleware } from "./Middlewares/JwtMiddleware.js";
import { isAdmin } from "./Middlewares/RoleMiddleware.js";
import { ATDTestRoutes } from "./Routes/Test/ATD.js";
import { TestScoreRoutes } from "./Routes/Test/TestScore.js";

// Use body-parser middleware with increased payload limit
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// //Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));
app.use("/auth", authRoutes);
// app.use(isAdmin) //For verifying user is admin?

app.use("/admin", teamRoutes);
app.use("/admin", articleRoutes);
app.use("/admin", questionRoutes);
app.use("/admin", categoryRoutes);
app.use("/admin/ATD", ATDQuestionRoutes);
app.use("/admin/userRecord", TestScoreRoutes);

app.use(jwtMiddleware) //For verifying JWT
app.use("/presTest", PrescreeningTestRoutes)
app.use("/atdTest", ATDTestRoutes)


app.get("/", (req, res) => {
  res.send("Welcome to Express Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
