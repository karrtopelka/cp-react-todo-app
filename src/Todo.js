import React, { useState } from "react";
import "./Todo.css";
import {
    List,
    ListItem,
    ListItemText,
    Modal,
    Button,
    TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateTodo = () => {
        // update the todo with the new input text
        db.collection("todos").doc(props.todo.id).set(
            {
                todo: input,
            },
            { merge: true }
        );
        setOpen(false);
    };
    return (
        <>
            <Modal open={open} onClose={handleClose} className="modal">
                <div style={modalStyle} className={classes.paper}>
                    <h1>Edit the todo</h1>
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Standard"
                            placeholder={props.todo.todo}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            disabled={!input}
                            onClick={updateTodo}
                        >
                            Update todo
                        </Button>
                    </div>
                </div>
            </Modal>
            <List className="todo__list">
                <ListItem>
                    <ListItemText
                        primary={props.todo.todo}
                        secondary="hurry up"
                    />
                </ListItem>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                >
                    Edit
                </Button>
                <DeleteForeverIcon
                    onClick={(event) =>
                        db.collection("todos").doc(props.todo.id).delete()
                    }
                />
            </List>
        </>
    );
}

export default Todo;
