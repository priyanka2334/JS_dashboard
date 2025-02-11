
document.addEventListener("DOMContentLoaded", function () {
    const loginPage = document.getElementById("login-page");
    const dashboard = document.getElementById("dashboard");
    const signinBtn = document.getElementById("signin-btn");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const themeToggle = document.getElementById("theme-toggle");
    const ageSelect = document.getElementById("age");
    const genderSelect = document.getElementById("gender");
    const dateInput = document.getElementById("date");

    let barChart, lineChart;

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }

    if (localStorage.getItem("isLoggedIn") === "true") {
        loginPage.classList.add("hidden");
        dashboard.classList.remove("hidden");
        signinBtn.style.display = "none";
        loadCharts();

        let savedTheme = getCookie("theme");
        let savedAge = getCookie("age");
        let savedGender = getCookie("gender");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            themeToggle.textContent = "Light Mode";
        }

        if (savedAge) ageSelect.value = savedAge;
        if (savedGender) genderSelect.value = savedGender;

        updateCharts();
    } else {
        loginPage.classList.remove("hidden");
        dashboard.classList.add("hidden");
    }


loginBtn.addEventListener("click", function () {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username !== "" && password !== "") {
        loginPage.classList.add("hidden");
        dashboard.classList.remove("hidden");
        signinBtn.style.display = "none";
        localStorage.setItem("isLoggedIn", "true");
        
        loadCharts();
    } else {
        alert("Please enter a valid username and password.");
    }
});


    logoutBtn.addEventListener("click", function () {
        dashboard.classList.add("hidden");
        loginPage.classList.remove("hidden");
        signinBtn.style.display = "block";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        localStorage.removeItem("isLoggedIn");
    });

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        let theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
        setCookie("theme", theme, 30);
    });

    ageSelect.addEventListener("change", function () {
        setCookie("age", ageSelect.value, 30);
        updateCharts();
    });

    genderSelect.addEventListener("change", function () {
        setCookie("gender", genderSelect.value, 30);
        updateCharts();
    });

    dateInput.addEventListener("change", updateCharts);

    function loadCharts() {
        const barCtx = document.getElementById("barChart").getContext("2d");
        const lineCtx = document.getElementById("lineChart").getContext("2d");

        const labels = ["A", "B", "C", "D", "E", "F"];

        barChart = new Chart(barCtx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Data Usage",
                    data: [30, 45, 20, 50, 60, 25],
                    backgroundColor: ["red", "blue", "green", "purple", "orange", "cyan"]
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        lineChart = new Chart(lineCtx, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{
                    label: "Growth Over Time",
                    data: [5, 15, 10, 20, 25, 30],
                    borderColor: "pink",
                    fill: false
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        updateCharts();
    }

    function updateCharts() {
        const selectedDate = dateInput.value;
        const selectedAge = ageSelect.value;
        const selectedGender = genderSelect.value;

        let dateData = {
            "2024-02-01": [10, 20, 30, 40, 50, 60],
            "2024-02-02": [25, 35, 45, 55, 65, 75],
            "2024-02-03": [15, 25, 35, 45, 55, 65],
            "2024-02-04": [20, 30, 40, 50, 60, 70]
        };

        let baseData = dateData[selectedDate] || [5, 10, 15, 20, 25, 30];

        let ageFactors = { "18": 1.1, "25": 1.2, "30": 1.3, "40": 1.4, "50": 1.5, "60": 1.6, "70": 1.7, "80": 1.8 };
        let genderFactors = { "Male": 1.0, "Female": 1.1, "Other": 1.2 };

        let ageMultiplier = ageFactors[selectedAge] || 1;
        let genderMultiplier = genderFactors[selectedGender] || 1;

        let updatedData = baseData.map(value => value * ageMultiplier * genderMultiplier);

        barChart.data.datasets[0].data = updatedData;
        lineChart.data.datasets[0].data = updatedData;

        barChart.update();
        lineChart.update();
    }
});








