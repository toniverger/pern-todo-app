import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("/tasks");
    const data = await response.json();
    setLoading(false);
    setTasks(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    console.log("Editing...");
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h1>Task List</h1>
      {tasks.map((task) => {
        return (
          <Card
            style={{
              marginBottom: ".7rem",
              backgroundColor: "#1e272e",
            }}
            key={task.id}
          >
            <CardContent
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ color: "white" }}>
                <Typography>{task.title}</Typography>
                <Typography>{task.description}</Typography>
              </div>
              <div>
                <Button variant="contained" onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(task.id)}
                  style={{
                    marginLeft: ".5rem",
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
