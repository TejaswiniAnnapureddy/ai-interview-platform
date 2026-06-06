import { useState } from "react";
import api from "../services/api";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const uploadResume = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/resume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setText(res.data.resume_text);
    alert(res.data.message);
  };

  return (
    <div>
      <h2>Upload Resume</h2>

      <form onSubmit={uploadResume}>
        <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <pre>{text}</pre>
    </div>
  );
}