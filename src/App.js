import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import ProfileList from "./components/ProfileList";
import ProfileDetails from "./components/ProfileDetails";


const App = () => {
  
  return (
    <div>
    <Router>
      <Routes>
      <Route path="/" element={<ProfileList />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/admin" element={<AdminPanel />} />
        </Routes>
    </Router>
    </div>
  )
}

export default App
