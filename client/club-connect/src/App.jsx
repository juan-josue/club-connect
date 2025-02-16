import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Preferences from "./pages/Preferences";
import Matching from "./pages/Matching";
import Results from "./pages/Results";
import Signup from "./pages/Signup";

import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/results" element={<Results />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
