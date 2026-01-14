import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("receipt", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(`Upload status: ${data.status}, file: ${data.filename}`);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Carbon Emission Tracker</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "1rem" }}>
        Upload Receipt
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
