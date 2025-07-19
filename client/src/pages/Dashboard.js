import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Dashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/forms/admin/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForms(res.data);
      } catch (err) {
        alert("Session expired or server error. Please log in again.");
        localStorage.clear();
        window.location.href = "/";
      }
    };

    fetchForms();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Your Feedback Forms</h1>
      {forms.length === 0 ? (
        <p>No forms found. Go create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <div key={form._id} className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold mb-2">{form.title}</h2>
              <a
                href={`/form/${form._id}`}
                className="text-blue-500 underline block"
              >
                Public Link
              </a>
              <a
                href={`/responses/${form._id}`}
                className="text-green-500 underline block mt-2"
              >
                View Responses
              </a>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Dashboard;
