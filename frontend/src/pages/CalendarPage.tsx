import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  title: string;
  details: string | null;
  completed: boolean;
  due_date: string | null;
}

const CalendarPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
        setTodos(response.data);
      } catch (err) {
        console.error("Failed to fetch tasks");
      }
    };
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(
    (todo) => todo.due_date === selectedDate
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        カレンダー
      </Typography>
      <Box mb={2} display="flex" gap={2}>
        <Button variant="contained" onClick={() => navigate("/home")}>ホームに戻る</Button>
        <TextField
          label="日付を選択"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </Box>
      {filteredTodos.map((todo) => (
        <Paper key={todo.id} elevation={3} style={{ padding: "1rem", margin: "0.5rem 0" }}>
          <Typography variant="h6">{todo.title}</Typography>
          {todo.details && (
            <Typography variant="body2" color="textSecondary">
              {todo.details}
            </Typography>
          )}
        </Paper>
      ))}
    </Container>
  );
};

export default CalendarPage;
