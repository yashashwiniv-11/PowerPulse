const reportList = document.getElementById("reportList");
const areaInput = document.getElementById("areaInput");

let reports = JSON.parse(localStorage.getItem("powerReports")) || [];

function reportCut() {
    const area = areaInput.value.trim();

    if (!area) {
        alert("Please enter your area");
        return;
    }

    const avgTime = getAverageTime(area);

    if (avgTime) {
        alert(`Power usually comes back in about ${avgTime} minutes in ${area}`);
    }

    reports.push({
        area: area,
        status: "❌ Power Cut",
        time: new Date()
    });

    updateUI();
}

function powerBack() {
    const area = areaInput.value.trim();

    if (!area) {
        alert("Please enter your area");
        return;
    }

    const currentTime = new Date();
    let message = `✅ Power Restored in ${area}`;

    for (let i = reports.length - 1; i >= 0; i--) {
        if (reports[i].area === area && reports[i].status === "❌ Power Cut") {
            const cutTime = new Date(reports[i].time);
            const duration = Math.floor((currentTime - cutTime) / 60000);
            message = `✅ Power Restored in ${area} (${duration} mins)`;
            break;
        }
    }

    reports.push({
        area: area,
        status: message,
        time: currentTime
    });

    updateUI();
}

function getAverageTime(area) {
    let total = 0;
    let count = 0;

    reports.forEach((report) => {
        if (report.area === area && report.status.includes("Restored")) {
            const match = report.status.match(/\((\d+) mins\)/);
            if (match) {
                total += parseInt(match[1]);
                count++;
            }
        }
    });

    return count ? Math.floor(total / count) : 0;
}

function deleteReport(index) {
    reports.splice(index, 1);
    updateUI();
}

function clearAll() {
    reports = [];
    updateUI();
}

function updateUI() {
    localStorage.setItem("powerReports", JSON.stringify(reports));
    renderReports();
    updateDashboard();
    areaInput.value = "";
}

function renderReports() {
    reportList.innerHTML = "";

    if (reports.length === 0) {
        reportList.innerHTML = "<p>No reports available</p>";
        return;
    }

    reports.forEach((report, index) => {
        const card = document.createElement("div");
        const type = report.status.includes("Cut") ? "cut" : "restored";
        const avgTime = getAverageTime(report.area);

        card.className = `report-card ${type}`;

        card.innerHTML = `
            <div>
                <strong>${report.status}</strong><br>
                <small>${new Date(report.time).toLocaleString()}</small><br>
                ${avgTime ? `<small>Avg restore: ${avgTime} mins</small>` : ""}
            </div>
            <button class="delete-btn" onclick="deleteReport(${index})">Delete</button>
        `;

        reportList.appendChild(card);
    });
}

function updateDashboard() {
    const totalReports = reports.length;

    let activeCuts = 0;
    let totalTime = 0;
    let count = 0;

    reports.forEach((report) => {
        if (report.status.includes("Cut")) {
            activeCuts++;
        }

        if (report.status.includes("Restored")) {
            const match = report.status.match(/\((\d+) mins\)/);
            if (match) {
                totalTime += parseInt(match[1]);
                count++;
            }
        }
    });

    const avg = count ? Math.floor(totalTime / count) : 0;

    document.getElementById("totalReports").textContent = totalReports;
    document.getElementById("activeCuts").textContent = activeCuts;
    document.getElementById("avgTime").textContent = avg + " mins";
}

renderReports();
updateDashboard();