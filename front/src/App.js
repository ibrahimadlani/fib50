import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { ProfilePage, SigninPage, LoginPage } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


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
