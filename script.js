// login button in navbar------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.querySelector(".login-btn");
    const modal = document.createElement("div");

    modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>Login</h2>
                <input type="text" id="username" placeholder="Username">
                <div class="password-wrapper">
                    <input type="password" id="password" placeholder="Password">
                    <button class="toggle-password">👁️</button>
                </div>
                <button class="submit-login">Login</button>
            </div>
        </div>
    `;
    modal.classList.add("login-modal");
    document.body.appendChild(modal);

    // Show modal on login button click
    loginBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Close modal when clicking the close button
    modal.querySelector(".close-btn").addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal container
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Password visibility toggle
    const passwordInput = modal.querySelector("#password");
    const toggleBtn = modal.querySelector(".toggle-password");

    toggleBtn.addEventListener("click", function () {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        toggleBtn.textContent = passwordInput.type === "password" ? "👁️" : "🔒";
    });

    // Basic login validation
    modal.querySelector(".submit-login").addEventListener("click", function () {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            alert("Please enter both username and password!");
        } else {
            alert(`Welcome, ${username}!`);
            modal.style.display = "none";
        }
    });
});



// Analyze resume------------------------------------------------------------------------------------------


function analyzeResume() {
    const fileInput = document.getElementById("resumeUpload");
    const resultsDiv = document.getElementById("analysisResults");
    const loadingDiv = document.getElementById("loading");

    // **Step 1: File Validation**
    if (fileInput.files.length === 0) {
        showAlert("❌ Upload a resume before analyzing!", "error");
        return;
    }

    const file = fileInput.files[0];
    const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;

    if (!allowedExtensions.exec(file.name)) {
        showAlert("❌ Unsupported format! Upload a PDF, DOC, or DOCX.", "error");
        return;
    }

    resultsDiv.innerHTML = ""; // Clear previous results

    // **Step 2: Show Loading Animation**
    loadingDiv.style.display = "block";
    resultsDiv.style.display = "none";

    setTimeout(() => {
        loadingDiv.style.display = "none";
        resultsDiv.style.display = "block";

        // **Step 3: AI Resume Scoring with Randomization**
        let formattingScore = Math.floor(Math.random() * 20) + 70; 
        let keywordScore = Math.floor(Math.random() * 30) + 50;  
        let atsScore = Math.floor(Math.random() * 30) + 40;  
        let grammarScore = Math.floor(Math.random() * 20) + 60;  
        let resumeScore = Math.round((formattingScore + keywordScore + atsScore + grammarScore) / 4); 

        // **Step 4: AI Feedback Generation**
        let formattingFeedback = formattingScore > 75 ? "✅ Well-structured resume!" : "⚠ Improve clarity with better formatting.";
        let keywordFeedback = keywordScore > 65 ? "✅ Strong keyword optimization!" : "⚠ Add relevant industry keywords.";
        let atsFeedback = atsScore > 55 ? "✅ Resume is ATS-compatible!" : "⚠ Simplify formatting to improve ATS readability.";
        let grammarFeedback = grammarScore > 70 ? "✅ Clear, professional language!" : "⚠ Improve sentence structure.";

        let suggestions = [
            "🔹 Use bullet points for better readability.",
            "🔹 Add measurable achievements (e.g., 'Increased sales by 20%').",
            "🔹 Include more action verbs like 'led,' 'managed,' 'developed.'",
            "🔹 Ensure consistent font size and style throughout the resume.",
            "🔹 Remove excessive details that may clutter readability."
        ];

        let randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

        // **Step 5: Display Results**
        resultsDiv.innerHTML = `
            <h3>🔍 Resume Analysis Completed</h3>
            <p>⚡ Resume Score: **${resumeScore}/100**</p>
            <div class="resume-insights">
                <div class="insight"><h4>✅ Formatting Quality</h4><p>${formattingFeedback}</p></div>
                <div class="insight"><h4>📈 Keyword Optimization</h4><p>${keywordFeedback}</p></div>
                <div class="insight"><h4>🖥 ATS Compatibility</h4><p>${atsFeedback}</p></div>
                <div class="insight"><h4>📖 Grammar & Clarity</h4><p>${grammarFeedback}</p></div>
            </div>
            <br>
            <h3>✨ AI Suggestion</h3>
            <p>${randomSuggestion}</p>

            <button class="reset-btn" onclick="resetAnalysis()">Analyze Another Resume</button>
        `;
    }, 3000);
}

// **Reusable Alert Function**
function showAlert(message, type) {
    const alertBox = document.createElement("div");
    alertBox.className = `alert ${type}`;
    alertBox.innerHTML = message;
    document.body.appendChild(alertBox);
    setTimeout(() => { alertBox.remove(); }, 3000);
}

// **Properly Reset Analysis**
function resetAnalysis() {
    const fileInput = document.getElementById("resumeUpload");
    const resultsDiv = document.getElementById("analysisResults");

    resultsDiv.style.display = "none";
    resultsDiv.innerHTML = ""; 
    fileInput.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
}


// contact form---------------------------------------------------------------------------------------

document.querySelector(".send-btn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Form Validation
    if (name === "") {
        showError("❌ Name cannot be empty!");
        return;
    }

    if (!email.match(emailPattern)) {
        showError("❌ Please enter a valid email address!");
        return;
    }

    if (message.length < 10) {
        showError("❌ Message should be at least 10 characters long!");
        return;
    }

    showLoading();

    setTimeout(() => {
        hideLoading();
        showSuccess("✅ Message sent successfully! We will get back to you soon.");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        document.getElementById("charCount").textContent = "Characters: 0";
    }, 2000); // Simulate a delay for sending message
});

// Loading Animation
function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

// Success & Error Messages
function showError(message) {
    let errorBox = document.createElement("div");
    errorBox.className = "error-box";
    errorBox.innerHTML = message;
    document.querySelector(".contact-container").appendChild(errorBox);

    setTimeout(() => {
        errorBox.remove();
    }, 3000);
}

function showSuccess(message) {
    let successBox = document.createElement("div");
    successBox.className = "success-box";
    successBox.innerHTML = message;
    document.querySelector(".contact-container").appendChild(successBox);

    setTimeout(() => {
        successBox.remove();
    }, 3000);
}

// Character Count Feature
document.getElementById("message").addEventListener("input", function() {
    document.getElementById("charCount").textContent = "Characters: " + this.value.length;
});


