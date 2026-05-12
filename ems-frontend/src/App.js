import ProtectedRoute
from "./ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

import LeavePage
from "./pages/LeavePage";

import ManagerLeaves
from "./pages/ManagerLeaves";

import ProfilePage
from "./pages/ProfilePage";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import EmployeeDashboard
from "./pages/EmployeeDashboard";

import ManagerDashboard
from "./pages/ManagerDashboard";

import AdminDashboard
from "./pages/AdminDashboard";

import EmployeeLeaves
from "./pages/EmployeeLeaves";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

      <Route
  path="/employee"
  element={
    <ProtectedRoute>

      <EmployeeDashboard />

    </ProtectedRoute>
  }
/>

        <Route
  path="/manager"
  element={
    <ProtectedRoute>

      <ManagerDashboard />

    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>

      <AdminDashboard />

    </ProtectedRoute>
  }
/>

<Route
  path="/leave"
  element={
    <ProtectedRoute>

      <LeavePage />

    </ProtectedRoute>
  }
/>

<Route
  path="/my-leaves"
  element={
    <ProtectedRoute>

      <EmployeeLeaves />

    </ProtectedRoute>
  }
/>

<Route
  path="/manager-leaves"
  element={
    <ProtectedRoute>

      <ManagerLeaves />

    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>

      <ProfilePage />

    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;