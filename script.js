const API = "http://localhost:5000";
function formatArea(area) {
  return area
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function sendStatus(status) {
  const input = document.getElementById("areaInput");
  let area = input.value.trim();

  if (!area) {
    alert("Enter area name");
    return;
  }

  area = formatArea(area);

  await fetch(API + "/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ area, status })
  });

  input.value = "";
  loadStatus();
}

async function loadStatus() {
  const res = await fetch(API + "/status");
  const data = await res.json();

  const table = document.getElementById("statusTable");

  if (data.length === 0) {
    table.innerHTML = `<tr><td colspan="3">No reports yet</td></tr>`;
    return;
  }

  table.innerHTML = data.map(item => `
    <tr>
      <td>${item.area}</td>
      <td>${item.status}</td>
      <td>${item.time}</td>
    </tr>
  `).join("");
}

async function clearAll() {
  await fetch(API + "/clear", {
    method: "DELETE"
  });

  loadStatus();
}

setInterval(loadStatus, 5000);

loadStatus();