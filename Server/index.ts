import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./Routes/StudentRoutes";
import personalRoutes from "./Routes/PersonalRoutes";
import planRoutes from "./Routes/PlanRoutes";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json(
    
));

app.use("/api", studentRoutes);
app.use("/api", personalRoutes);
app.use("/api", planRoutes);

app.listen(3001, () => {
  console.log("htpp://localhost:" + PORT);
});
