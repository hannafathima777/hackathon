import React, { useState } from "react";
import { uploadReceipt, getEmissionResults } from "../services/api";

export default function UploadReceipt({ setResults }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    setLoading(true);
    try {
      await uploadReceipt(file);
      const results = await getEmissionResults();
      setResults(results);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Upload Your Receipt</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".jpg,.png,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
