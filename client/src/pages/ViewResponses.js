import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function ViewResponses() {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/responses/form/${formId}`);
        setResponses(res.data);
      } catch (err) {
        alert("Error fetching responses");
      }
    };

    fetchResponses();
  }, [formId]);

  const exportCSV = () => {
    if (responses.length === 0) return;

    // Generate CSV headers from first response's questions
    const headers = responses[0].answers.map(a => a.questionText).join(",");
    const rows = responses.map(r =>
      r.answers.map(a => `"${a.answerText.replace(/"/g, '""')}"`).join(",")
    );
    const csv = [headers, ...rows].join("\n");

    // Trigger download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.csv";
    a.click();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Responses</h1>

      <button
        onClick={exportCSV}
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
      >
        Export as CSV
      </button>

      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow text-sm">
            <thead>
              <tr>
                {responses[0]?.answers.map((a, i) => (
                  <th key={i} className="border px-3 py-2 text-left bg-gray-100">
                    {a.questionText}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses.map((r, i) => (
                <tr key={i} className="border-t">
                  {r.answers.map((a, j) => (
                    <td key={j} className="border px-3 py-2">{a.answerText}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

export default ViewResponses;
