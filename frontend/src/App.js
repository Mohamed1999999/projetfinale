import React, { useState, useEffect } from 'react';
 import ToDo from './components/ToDo';
 import { getAllToDo, addToDo, updateToDo, deleteToDo } from './utils/HandleApi';
 import 'bootstrap/dist/css/bootstrap.min.css'; // Importez le fichier CSS Bootstrap
 import 'animate.css/animate.min.css'; // Importez le fichier CSS animate.css


 function App() {
    const [toDo, setToDo] = useState([]);
    const [text, setText] = useState('');
   const [updating, setIsUpdating] = useState(false);
     const [toDoId, setToDoId] = useState('');
    const [error, setError] = useState('');
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        getAllToDo(setToDo,setError);
     }, []);

    const handleAddOrUpdate = () => {
         if (text.trim() ==='') {
           setError('Task cannot be empty');
             return;
        }

        if (updating) {
             updateToDo(toDoId, text, setToDo, setText, setIsUpdating, setError);
        } else {
            setAnimationClass('animate__animated animate__fadeOutUp');
             addToDo(text, setText, setToDo, (error) => {
                 setError(error);
                 setAnimationClass('');
            });
         }
    };
    const clearError = () => {
        setError('');
    };

     return (
         <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
            <div className={`text-center ${animationClass}`}>
                 <h1>Mactive</h1>
                <div className='top'>
                     <input
                        type='text'
                        placeholder='Enter task'
                       value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                   <div className='add btn btn-success' onClick={handleAddOrUpdate}>
                     {updating ? 'Update' : 'Add'}
                   </div>
                </div>
               {error && (
                    <div className='alert alert-danger mt-3' role='alert'>
                        {error}
                        <button type='button' className='close' aria-label='Close' onClick={clearError}>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                )}
                <div className='list'>
                    {toDo.map((item) => (
                        <ToDo
                        key={item._id}  // Use a unique identifier from your data as the key
                        text={item.title}
                        updateMode={() => {
                            setIsUpdating(true);
                             setText(item.text);
                             setToDoId(item._id);
                       }}
                       deleteToDo={() => deleteToDo(item._id, setToDo, setError)}
                        />
                   ))}
                 </div>
           </div>
      </div>
    );
}

 export default App;
