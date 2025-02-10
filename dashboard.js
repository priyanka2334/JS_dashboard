
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

    // Sign-in button event
    signinBtn.addEventListener("click", function () {
        loginPage.classList.remove("hidden");
        gsap.from(loginPage, { opacity: 0, y: -50, duration: 1 });
    });

    // Login button event
    loginBtn.addEventListener("click", function () {
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        if (username !== "" && password !== "") {
            gsap.to(loginPage, { opacity: 1, duration: 1, onComplete: () => {
                loginPage.classList.add("hidden");
                dashboard.classList.remove("hidden");
                gsap.from(dashboard, { opacity: 1, y: -50, duration: 1 });
                signinBtn.style.display = "none";
                loadCharts();
            }});
        } else {
            alert("Please enter a valid username and password.");
        }
    });

    // Logout button event
    logoutBtn.addEventListener("click", function () {
        gsap.to(dashboard, { duration: 1, onComplete: () => {
            dashboard.classList.add("hidden");
            loginPage.classList.remove("hidden");
            gsap.from(loginPage, { opacity: 0, y: -50, duration: 1 });
            signinBtn.style.display = "block";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }});
    });

    // Theme toggle event
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    });

    // Event listeners for updating charts dynamically
    ageSelect.addEventListener("change", updateCharts);
    genderSelect.addEventListener("change", updateCharts);
    dateInput.addEventListener("change", updateCharts);

    // Function to load initial charts
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
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
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
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        updateCharts();  // Ensure initial charts get correct data
    }

    // Function to update charts based on Age, Gender, and Date
    function updateCharts() {
        const selectedDate = dateInput.value;
        const selectedAge = ageSelect.value;
        const selectedGender = genderSelect.value;

        // Sample dataset for different dates
        let dateData = {
            "2024-02-01": [10, 20, 30, 40, 50, 60],
            "2024-02-02": [25, 35, 45, 55, 65, 75],
            "2024-02-03": [15, 25, 35, 45, 55, 65],
            "2024-02-04": [20, 30, 40, 50, 60, 70]
        };

        let baseData = dateData[selectedDate] || [5, 10, 15, 20, 25, 30];

        // Age-based multipliers
        let ageFactors = {
            "18": 1.1, "25": 1.2, "30": 1.3, "40": 1.4, 
            "50": 1.5, "60": 1.6, "70": 1.7, "80": 1.8
        };

        // Gender-based multipliers
        let genderFactors = {
            "Male": 1.0, "Female": 1.1, "Other": 1.2
        };

        let ageMultiplier = ageFactors[selectedAge] || 1;
        let genderMultiplier = genderFactors[selectedGender] || 1;

        let updatedData = baseData.map(value => value * ageMultiplier * genderMultiplier);

        barChart.data.datasets[0].data = updatedData;
        lineChart.data.datasets[0].data = updatedData;

        barChart.update();
        lineChart.update();
    }
});















