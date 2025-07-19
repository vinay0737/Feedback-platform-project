import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CreateForm from "./pages/CreateForm";
import PublicForm from "./pages/PublicForm";
import ViewResponses from "./pages/ViewResponses";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<CreateForm />} />

      {/* Public form access & response viewing */}
      <Route path="/form/:formId" element={<PublicForm />} />
      <Route path="/responses/:formId" element={<ViewResponses />} />
    </Routes>
  );
}

export default App;

