import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Signin />} path="/signin" />
        <Route element={<Signup />} path="/signup" />
        <Route></Route>
      </Routes>
    </Router>
  );
}

export default App;
