const API_URL = "http://localhost:5000";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Register
if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      message.style.color = response.ok ? "green" : "red";
      message.textContent = data.message;

      if (response.ok) {
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      }
    } catch (error) {
      message.style.color = "red";
      message.textContent = "Server error.";
    }
  });
}

// Login
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      message.style.color = response.ok ? "green" : "red";
      message.textContent = data.message;

      if (response.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      }
    } catch (error) {
      message.style.color = "red";
      message.textContent = "Server error.";
    }
  });
}