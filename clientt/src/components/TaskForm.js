import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function TaskForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [task, setTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchData = async (id) => {
    const response = await fetch(`/tasks/${id}`);
    const data = await response.json();
    setTask({ title: data.title, description: data.description });
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      fetchData(params.id);
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editing) {
      await fetch(`/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch("/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    navigate("/");
    setLoading(false);
  };

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            {editing ? "Edit Task" : "Create Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"    
                label="Write your title"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                value={task.title}
                onChange={handleChange}
                name="title"
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                value={task.description}
                onChange={handleChange}
                name="description"
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={!task.title || !task.description || loading}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
