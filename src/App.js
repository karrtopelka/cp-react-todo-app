import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { Button, TextField } from "@material-ui/core";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  // when the app loads, we need to listen to the db and fetch new todos as they get added/removed

  useEffect(() => {
    // this code here... fires when the app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => doc.data().todo));
        // returns object (if it without .todo), returns array of strings with .todo
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
    // return () => {
    //     cleanup;
    // };
  }, []);

  const [input, setInput] = useState("");

  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); // will stop refresh

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setTodos([...todos, input]);
    setInput(""); // clear input form after hitting enter
  };

  return (
    <div className="App">
      <h1>Hello Karrtopelka!</h1>
      <form>
        <TextField
          id="outlined-basic"
          label="Write a todo"
          variant="outlined"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>

        {/* <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                /> */}
        {/* <button type="submit" onClick={addTodo}>
                    Add Todo
                </button> */}
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
