import app from "./index.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("¡Hola Mundo desde Express!");
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
