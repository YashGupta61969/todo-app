import {Routes, Route} from 'react-router-dom'
import Login from "./components/Login";
import TodoPage from "./components/TodoPage";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      
      <Routes>
          <Route index element={<TodoPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
