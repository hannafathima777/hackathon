const API_URL = "http://127.0.0.1:8000"; // replace with your backend URL

export async function uploadReceipt(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload receipt");
  }
  return response.json();
}

export async function getEmissionResults() {
  const response = await fetch(`${API_URL}/results`);
  if (!response.ok) {
    throw new Error("Failed to fetch emission results");
  }
  return response.json();
}

export async function fetchAnalytics() {
  const response = await fetch(`${API_URL}/analytics`);

  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return response.json();
}
