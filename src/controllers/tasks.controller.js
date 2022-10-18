const db = require("../db");

const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await db.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (e) {
    next(e);
  }
};

const getTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await db.query("SELECT * FROM task WHERE id = $1", [id]);

    if (task.rows.length === 0) {
      return res.status(400).json({ message: "Tarea no encontrada" });
    }

    res.json(task.rows[0]);
  } catch (e) {
    next(e);
  }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const response = await db.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.json(response.rows[0]);
  } catch (e) {
    next(e);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updateTask = await db.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );

    if (updateTask.rowCount === 0) {
      return res.status(400).json({ message: "Tarea no encontrada" });
    }

    res.json(updateTask.rows[0]);
  } catch (e) {
    next(e);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await db.query("DELETE FROM task WHERE id = $1", [id]);

    if (task.rowCount === 0) {
      return res.status(400).json({ message: "Tarea no encontrada" });
    }

    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
