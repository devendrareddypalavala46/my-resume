const toggle = document.getElementById("themeToggle");

// ==========================================
// Dark Mode Toggle
// ==========================================
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// ==========================================
// Contact Form - AJAX Submit (Works from local HTML file)
// ==========================================
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get values
  const name = document.querySelector('input[type="text"]').value.trim();
  const email = document.querySelector('input[type="email"]').value.trim();
  const message = document.querySelector("textarea").value.trim();

  // Validation
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Button loading state
  const submitButton = contactForm.querySelector("button");
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    // Use FormData instead of JSON (works better from file:// URLs)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("_subject", "Portfolio Contact from " + name);

    // Send email silently without opening Outlook
    const response = await fetch(
      "https://formsubmit.co/ajax/devendrareddypalavala46@gmail.com",
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      }
    );

    const result = await response.json();

    // Check success
    if (result.success) {
      // Clear form fields
      contactForm.reset();

      // Show success message
      alert("Email sent successfully!");

      // Optional page reload after 1 second
      // setTimeout(() => location.reload(), 1000);
    } else {
      alert("Failed to send email. Please try again.");
      console.log(result);
    }
  } catch (error) {
    console.error("Error:", error);

    // This usually happens when opening HTML directly with file://
    // Solution: Run with Live Server in VS Code
    alert(
      "Unable to send email from local file.\n\n" +
      "Please open your portfolio using Live Server in VS Code."
    );
  } finally {
    // Restore button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});