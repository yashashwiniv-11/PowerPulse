if (localStorage.getItem("role") !== "admin") {
  alert("Access denied");
  window.location.href = "index.html";
}

async function loadUsers() {
  const res = await fetch("http://localhost:5000/users");
  const users = await res.json();

  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.username} (${user.role})`;
    userList.appendChild(li);
  });
}

loadUsers();