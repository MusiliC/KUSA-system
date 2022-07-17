
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Fixtures from './components/fixtures/Fixtures';
import Home from "./components/home/Home";
import Navigation from './components/navigation/Navigation';
import Results from './components/results/Results';
import Teams from './components/teams/Teams';
import Sidebar from "./dashboard/admin-menu/Sidebar";


function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/:id/*" element={<Sidebar/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
