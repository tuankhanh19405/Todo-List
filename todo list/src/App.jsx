import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import TodoList from './pages/TodoList';
import ImportantTodos from './pages/ImportantTodos';
import TodoDetail from './pages/TodoDetail';
import CreateTodos from './pages/CreateTodos';
import EditTodos from './pages/EditTodos';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<TodoList />} />
          <Route path='/important' element={<ImportantTodos />} />
          <Route path='/todos/:id' element={<TodoDetail />} />
          <Route path='/todos/add' element={<CreateTodos />} />
          <Route path='/todos/edit/:id' element={<EditTodos />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;