const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path')
const PORT = process.env.PORT || 4000

const taskRoutes = require("./routes/tasks.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../client/build')))
}

app.use(taskRoutes);
app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(PORT);
console.log(`Servidor iniciado en el puerto ${PORT} :D`);
