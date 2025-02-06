
document.addEventListener("DOMContentLoaded", function () {
    const loginPage = document.getElementById("login-page");
    const dashboard = document.getElementById("dashboard");
    const signinBtn = document.getElementById("signin-btn");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const themeToggle = document.getElementById("theme-toggle");
    const ageSelect = document.getElementById("age");
    const genderSelect = document.getElementById("gender");

    let barChart, lineChart; // Global Chart Variables

    // Sign In Button Click
    signinBtn.addEventListener("click", function () {
        loginPage.classList.remove("hidden");
        gsap.from(loginPage, { opacity: 0, y: -50, duration: 1 });
    });

    // Login Functionality
    loginBtn.addEventListener("click", function () {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (username === "admin" && password === "1234") {
            gsap.to(loginPage, { opacity: 0, duration: 1, onComplete: () => {
                loginPage.classList.add("hidden");
                dashboard.classList.remove("hidden");
                gsap.from(dashboard, { opacity: 0, y: -50, duration: 1 });
                signinBtn.style.display = "none";
                loadCharts(); // Load charts initially
            }});
        } else {
            alert("Invalid Credentials! (Use admin/1234)");
        }
    });

    // Logout Functionality

    logoutBtn.addEventListener("click", function () {
        gsap.to(dashboard, { opacity: 0, duration: 1, onComplete: () => {
            dashboard.classList.add("hidden");
            loginPage.classList.remove("hidden");
            gsap.from(loginPage, { opacity: 0, y: -50, duration: 1 });
            signinBtn.style.display = "block";
        }});
    });
    
    // logoutBtn.addEventListener("click", function () {
    //     dashboard.classList.add("hidden");
    //     loginPage.classList.remove("hidden");
    //     signinBtn.style.display = "block";
    // });

    // Dark Mode / Light Mode Toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    });

    // Age & Gender Change Functionality with Chart Update
    ageSelect.addEventListener("change", function () {
        // document.getElementById("age-display").textContent = `Age: ${ageSelect.value}`;
        updateCharts();
    });

    genderSelect.addEventListener("change", function () {
        // document.getElementById("gender-display").textContent = `Gender: ${genderSelect.value}`;
        updateCharts();
    });

    // Load Charts Function
    function loadCharts() {
        const barCtx = document.getElementById("barChart").getContext("2d");
        barChart = new Chart(barCtx, {
            type: "bar",
            data: {
                labels: ["A", "B", "C", "D"],
                datasets: [{
                    label: "Data Usage",
                    data: [30, 45, 20, 50],
                    backgroundColor: ["red", "blue", "green", "purple"]
                }]
            }
        });

        const lineCtx = document.getElementById("lineChart").getContext("2d");
        lineChart = new Chart(lineCtx, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr"],
                datasets: [{
                    label: "Growth",
                    data: [5, 15, 10, 20],
                    borderColor: "yellow",
                    fill: false
                }]
            }
        });
    }

    // Update Charts with New Data
    function updateCharts() {
        let ageData = {
            "18": [10, 20, 30, 40],
            "25": [25, 35, 45, 55],
            "30": [15, 25, 35, 45],
            "40": [20, 30, 40, 50],
            "50": [30, 40, 50, 60]
        };

        let genderFactor = { "Male": 1.2, "Female": 1.0, "Other": 0.8 };

        let selectedAge = ageSelect.value;
        let selectedGender = genderSelect.value;

        let newBarData = ageData[selectedAge].map(value => value * genderFactor[selectedGender]);
        let newLineData = ageData[selectedAge].map(value => value / genderFactor[selectedGender]);

        barChart.data.datasets[0].data = newBarData;
        barChart.update();

        lineChart.data.datasets[0].data = newLineData;
        lineChart.update();
    }
});





























// document.addEventListener("DOMContentLoaded", function () {
//     const loginPage = document.getElementById("login-page");
//     const dashboard = document.getElementById("dashboard");
//     const signinBtn = document.getElementById("signin-btn");
//     const loginBtn = document.getElementById("login-btn");
//     const logoutBtn = document.getElementById("logout-btn");
//     const themeToggle = document.getElementById("theme-toggle");
//     const ageSelect = document.getElementById("age");
//     const genderSelect = document.getElementById("gender");

//     let barChart, lineChart; // Global Chart Variables

//     // Sign In Button Click
//     signinBtn.addEventListener("click", function () {
//         loginPage.classList.remove("hidden");
//         gsap.from(loginPage, { opacity: 0, y: -50, duration: 1 });
//     });

//     // Login Functionality
//     loginBtn.addEventListener("click", function () {
//         let username = document.getElementById("username").value;
//         let password = document.getElementById("password").value;

//         if (username === "admin" && password === "1234") {
//             gsap.to(loginPage, { opacity: 0, duration: 1, onComplete: () => {
//                 loginPage.style.display = "none";
//                 dashboard.classList.remove("hidden");
//                 gsap.from(dashboard, { opacity: 0, y: -50, duration: 1 });
//                 signinBtn.style.display = "none";
//                 loadCharts(); // Load charts initially
//             }});
//         } else {
//             alert("Invalid Credentials! (Use admin/1234)");
//         }
//     });

//     // Logout Functionality
//     logoutBtn.addEventListener("click", function () {
//         dashboard.classList.add("hidden");
//         loginPage.style.display = "flex";
//         signinBtn.style.display = "block";
//     });

//     // Dark Mode / Light Mode Toggle
//     themeToggle.addEventListener("click", function () {
//         document.body.classList.toggle("dark-mode");
//         themeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
//     });

//     // Age & Gender Change Functionality with Chart Update
//     ageSelect.addEventListener("change", function () {
//         document.getElementById("age-display").textContent = `Age: ${ageSelect.value}`;
//         updateCharts();
//     });

//     genderSelect.addEventListener("change", function () {
//         document.getElementById("gender-display").textContent = `Gender: ${genderSelect.value}`;
//         updateCharts();
//     });

//     // Load Charts Function
//     function loadCharts() {
//         const barCtx = document.getElementById("barChart").getContext("2d");
//         barChart = new Chart(barCtx, {
//             type: "bar",
//             data: {
//                 labels: ["A", "B", "C", "D"],
//                 datasets: [{
//                     label: "Data Usage",
//                     data: [30, 45, 20, 50],
//                     backgroundColor: ["red", "blue", "green", "purple"]
//                 }]
//             }
//         });

//         const lineCtx = document.getElementById("lineChart").getContext("2d");
//         lineChart = new Chart(lineCtx, {
//             type: "line",
//             data: {
//                 labels: ["Jan", "Feb", "Mar", "Apr"],
//                 datasets: [{
//                     label: "Growth",
//                     data: [5, 15, 10, 20],
//                     borderColor: "yellow",
//                     fill: false
//                 }]
//             }
//         });
//     }

//     // Update Charts with New Data
//     function updateCharts() {
//         let ageData = {
//             "18": [10, 20, 30, 40],
//             "25": [25, 35, 45, 55],
//             "30": [15, 25, 35, 45],
//             "40": [20, 30, 40, 50],
//             "50": [30, 40, 50, 60]
//         };

//         let genderFactor = { "Male": 1.2, "Female": 1.0, "Other": 0.8 };

//         let selectedAge = ageSelect.value;
//         let selectedGender = genderSelect.value;

//         let newBarData = ageData[selectedAge].map(value => value * genderFactor[selectedGender]);

//         barChart.data.datasets[0].data = newBarData;
//         barChart.update();
//     }
// });






























