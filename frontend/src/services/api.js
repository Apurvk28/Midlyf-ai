const API_BASE_URL = "http://localhost:5001/api";

export const getFutureMeReply = async (message) => {
  try {
    const res = await fetch(`${API_BASE_URL}/future-me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
