import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProfilePage, SignupPage, LoginPage } from "./pages";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route 
            path="/"
            element={<LoginPage />}
          />
          <Route
            path="/signup"
            element={<SignupPage />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute Component={ProfilePage} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
