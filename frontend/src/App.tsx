import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ContentLibrary from "./pages/ContentLibrary";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Signin />} path="/auth/signin" />
        <Route element={<Signup />} path="/auth/signup" />
        <Route element={<Layout />} path="/">
          <Route element={<Dashboard />} index />
          <Route element={<ContentLibrary />} path="/contentLibrary" />
          <Route element={<TodoList />} path="/todoList" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
