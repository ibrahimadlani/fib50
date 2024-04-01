import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProfilePage, SigninPage, LoginPage } from "./pages";
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
            path="/signin"
            element={<SigninPage />}
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
