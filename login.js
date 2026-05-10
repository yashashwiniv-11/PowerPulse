const API_URL = "http://localhost:5000";

async function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  alert(data.message);
}

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", username);

    window.location.href = "index.html";
  } else {
    alert(data.message);
  }
}