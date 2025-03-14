import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./Routes/StudentRoutes";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json(
    
));

app.use("/api", studentRoutes);

app.listen(3001, () => {
  console.log("htpp://localhost:" + PORT);
});
