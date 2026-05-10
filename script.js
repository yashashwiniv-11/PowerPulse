const API_URL = "http://localhost:5000";

// Check login
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "login.html";
}

// Show username
const userNameElement = document.getElementById("userName");
if (userNameElement) {
  userNameElement.textContent = `Welcome, ${currentUser.name}`;
}

// Load reports when page opens
loadReports();

async function reportStatus(status) {
  const areaInput = document.getElementById("areaInput");
  const area = areaInput.value.trim();

  if (!area) {
    alert("Please enter an area name.");
    return;
  }

  try {
    await fetch(`${API_URL}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ area, status })
    });

    areaInput.value = "";
    loadReports();
  } catch (error) {
    alert("Failed to submit report.");
  }
}

async function loadReports() {
  const tableBody = document.getElementById("reportTableBody");

  try {
    const response = await fetch(`${API_URL}/status`);
    const reports = await response.json();

    if (reports.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="3">No reports yet.</td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = reports
      .map(
        (report) => `
          <tr>
            <td>${report.area}</td>
            <td>${report.status}</td>
            <td>${new Date(report.time).toLocaleString()}</td>
          </tr>
        `
      )
      .join("");
  } catch (error) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="3">Unable to load reports.</td>
      </tr>
    `;
  }
}

async function clearReports() {
  const confirmClear = confirm("Are you sure you want to delete all reports?");
  if (!confirmClear) return;

  try {
    await fetch(`${API_URL}/clear`, {
      method: "DELETE"
    });

    loadReports();
  } catch (error) {
    alert("Failed to clear reports.");
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}