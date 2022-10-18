import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskFrom from "./components/TaskForm";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskFrom />} />
          <Route path="/tasks/:id/edit" element={<TaskFrom />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
