import TodoList from "./pages/todolist";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-4xl w-full p-4">
        <TodoList />
      </div>
    </div>
  );
}

export default App;