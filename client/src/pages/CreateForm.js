import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function CreateForm() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ questionText: "" }]);
  const navigate = useNavigate();

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "" }]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    if (!title.trim() || questions.some((q) => !q.questionText.trim())) {
      alert("Form title and all questions must be filled.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/forms/create",
        { title, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const formId = res.data._id;
      alert("✅ Form created!");
      navigate(`/form/${formId}`);
    } catch (err) {
      console.error("Error creating form:", err);
      alert("❌ Error creating form. Check console.");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Create New Feedback Form</h1>

      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {questions.map((q, i) => (
        <div key={i} className="flex gap-2 mb-2 items-center">
          <input
            type="text"
            placeholder={`Question ${i + 1}`}
            value={q.questionText}
            onChange={(e) => handleQuestionChange(i, e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={() => removeQuestion(i)}
            className="text-red-600 text-xl"
          >
            ✖
          </button>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        ➕ Add Question
      </button>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        ✅ Create Form
      </button>
    </Layout>
  );
}

export default CreateForm;
