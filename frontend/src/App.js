import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WorkoutPage from "./pages/WorkoutPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<WorkoutPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
