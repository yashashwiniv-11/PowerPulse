const API = "http://localhost:5000";

if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

const socket = io(API);

const areaInput =
  document.getElementById("areaInput");

const tableBody =
  document.getElementById("tableBody");

async function fetchStatus() {
  const res = await fetch(
    `${API}/status`
  );

  const data = await res.json();

  displayData(data);
}

function displayData(data) {
  tableBody.innerHTML = "";

  const latest = {};

  data.forEach((item, index) => {
    latest[item.area.toLowerCase()] = {
      ...item,
      index,
    };
  });

  if (
    Object.values(latest).length === 0
  ) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4">
          No reports available
        </td>
      </tr>
    `;

    return;
  }

  Object.values(latest).forEach(
    (item) => {
      const row = `
        <tr>
          <td>${item.area}</td>

          <td>
            ${item.status}
          </td>

          <td>
            ${item.time}
          </td>

          <td>
            <button
              class="delete"
              onclick="deleteReport(${item.index})"
            >
              Delete
            </button>
          </td>
        </tr>
      `;

      tableBody.innerHTML += row;
    }
  );
}

async function updatePower(status) {
  const area =
    areaInput.value.trim();

  if (!area) {
    alert("Enter area name");
    return;
  }

  await fetch(`${API}/update`, {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",

      Authorization:
        localStorage.getItem(
          "token"
        ),
    },

    body: JSON.stringify({
      area,
      status,
    }),
  });

  areaInput.value = "";
}

async function deleteReport(index) {
  await fetch(
    `${API}/delete/${index}`,
    {
      method: "DELETE",

      headers: {
        Authorization:
          localStorage.getItem(
            "token"
          ),
      },
    }
  );

  fetchStatus();
}

socket.on(
  "power-update",
  () => {
    fetchStatus();

    showNotification(
      "⚡ Live Update Received"
    );
  }
);

socket.on(
  "data-deleted",
  () => {
    fetchStatus();
  }
);

function showNotification(message) {
  const note =
    document.createElement("div");

  note.className =
    "notification";

  note.innerText = message;

  document.body.appendChild(note);

  setTimeout(() => {
    note.remove();
  }, 3000);
}

function logout() {
  localStorage.removeItem(
    "token"
  );

  window.location.href =
    "login.html";
}

document
  .getElementById("searchInput")
  .addEventListener(
    "input",
    function () {
      const value =
        this.value.toLowerCase();

      const rows =
        document.querySelectorAll(
          "tbody tr"
        );

      rows.forEach((row) => {
        const area =
          row.children[0].innerText.toLowerCase();

        row.style.display =
          area.includes(value)
            ? ""
            : "none";
      });
    }
  );

fetchStatus();