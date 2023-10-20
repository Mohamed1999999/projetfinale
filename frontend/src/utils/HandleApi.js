import axios from 'axios';

const baseUrl="http://localhost:5000";

export const getAllToDo = (setToDo, setError) => {
    axios
    .get(baseUrl)
    .then(({ data }) => {
        console.log('data...', data);
        setToDo(data);
    })
    .catch((error) => {
        console.error("Error fetching todos:", error);
        setError("Error fetching todos. Please try again later.");
    });
};

/*export const addToDo = (text, setText, setToDo, setError) => {
    axios
    .post(`${baseUrl}/save`, { text })
    .then((data) => {
        console.log("mes donnes sont-----------------",data);
        setText("");
        getAllToDo(setToDo, setError);
    })
    .catch((error) => {
        console.error("Error adding todo:", error);
        setError("Error adding todo. Please try again later.");
    });
};*/
export const addToDo = (text, setText, setToDo, setError) => {
    console.log('Adding new task:', text);
    axios
        .post(`${baseUrl}/save`, { text })
        .then((data) => {
            console.log('Task added successfully:', data);
            setText('');
            setToDo(prevToDo => [...prevToDo, data]); // Update the state with the new task
            //setToDo([...toDo, data]); // Update the state with the new task
            getAllToDo(setToDo, setError);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error adding todo:', error);
            setError('Error adding todo. Please try again later.');
        });
};


export const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating, setError) => {
    axios
    .post(`${baseUrl}/update`, { _id: toDoId, text })
    .then((data) => {
        setText("");
        setIsUpdating(false);
        getAllToDo(setToDo, setError);
    })
    .catch((error) => {
        console.error("Error updating todo:", error);
        setError("Error updating todo. Please try again later.");
    });
};

export const deleteToDo = (_id, setToDo, setError) => {

    axios
    .post(`${baseUrl}/delete`, { _id })
    .then((data) => {
        console.log(data);
        getAllToDo(setToDo, setError);
    })
    .catch((error) => {
        // console.error("Error deleting todo:", error);
        setError("Error deleting todo. Please try again later.");
    });
};
// 