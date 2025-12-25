import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./App.css"; // We will put the centering styles here

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Helper to render the correct view inside the centered wrapper
  const renderContent = () => {
    if (!token) {
      if (showRegister) {
        return <Register onSuccess={() => setShowRegister(false)} />;
      }
      return (
        <Login
          setToken={setToken}
          onRegister={() => setShowRegister(true)}
        />
      );
    }
    return <Dashboard token={token} onLogout={logout} />;
  };

  return (
    <div className="app-viewport">
      {renderContent()}
    </div>
  );
}

export default App;