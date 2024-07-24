import './App.css';
import {useRef, useReducer} from 'react';

import Header from './component/Header';
import TodoEditor from "./component/TodoEditor";
import TodoList from './component/TodoList';

const mockTodo = [
  
]

function reducer(state, action) {

  switch (action.type) {
    case 'create':
      return [...state, action.newItem];
      
    case 'update':
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );
     

    case 'delete':
      return state.filter((it) => it.id !== action.targetId);
      

    default:
       return state;
  }


 

}

function App() {  
  // const [todo, setTodo] = useState(mockTodo);
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef=useRef(2);

  const onCreate= (content) =>{
  dispatch(
    {
      type:'create',
      newItem :{
      id:idRef.current,
      isDone:false,
      content,
      todoDate: new Date()
    },}
  )

    // setTodo([newItem,...todo]);
    idRef.current+=1;

  }

  const onUpdate = (targetId) => {
    dispatch(
      {
        type:'update',
        targetId
      }
    );
    // setTodo(
    //   todo.map((it) =>
    //     it.id === targetId ? { ...it, isDone: !it.isDone } : it
    //   )
    // );
  };

  const onDelete = (targetId) => {
    // setTodo(todo.filter((it) => it.id !== targetId));
    dispatch(
      {
        type:'delete',
        targetId
      }
    );
  };

  return (
    <div className="App">
      <Header/>
      <TodoEditor onCreate={onCreate}/>
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;