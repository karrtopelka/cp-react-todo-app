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
                // returns object (if it without .todo), returns array of strings with .todo
                setTodos(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        todo: doc.data().todo,
                    }))
                );
            });
    }, []);

    const [input, setInput] = useState("");

    const addTodo = (event) => {
        // this will fire off when we click the button
        event.preventDefault(); // will stop refresh

        db.collection("todos").add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput(""); // clear input form after hitting enter
    };

    return (
        <div className="App">
            <div>
                <h1>Hello, this is a TODO App!</h1>
                <h4>
                    Add some todos{" "}
                    <span role="img" aria-label="😎">
                        😎
                    </span>
                </h4>
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
                </form>
            </div>
            <ul>
                {todos.map((todo) => (
                    <Todo todo={todo} />
                ))}
            </ul>
        </div>
    );
}

export default App;
