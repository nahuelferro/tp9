const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
  const { action, id, name, email, dob } = req.body;

  console.log(`Acción: ${action}`);
  console.log("Datos:", req.body);

  res.send(`Operación '${action}' procesada correctamente.`);
});

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
