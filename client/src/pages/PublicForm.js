import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PublicForm() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Fetch form data when page loads
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/forms/${formId}`);
        setForm(res.data);
        setAnswers(res.data.questions.map(() => "")); // Initialize empty answers
      } catch (err) {
        alert("Form not found");
      }
    };

    fetchForm();
  }, [formId]);

  // Submit feedback
  const handleSubmit = async () => {
    const response = form.questions.map((q, i) => ({
      questionText: q.questionText,
      answerText: answers[i]
    }));

    try {
      await axios.post(`http://localhost:5000/api/responses/${formId}`, {
        answers: response
      });
      alert("✅ Thanks for your feedback!");
    } catch (err) {
      alert("❌ Error submitting feedback");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {form?.title || "Loading..."}
      </h1>

      {form?.questions.map((q, i) => (
        <div key={i} className="mb-4">
          <label className="block mb-1 font-medium">{q.questionText}</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={answers[i]}
            onChange={(e) => {
              const updated = [...answers];
              updated[i] = e.target.value;
              setAnswers(updated);
            }}
          />
        </div>
      ))}

      {form && (
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default PublicForm;
