const toggle = document.getElementById("themeToggle");

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

// Contact Form - Open user's email client
document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector('input[type="text"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const message = document.querySelector("textarea").value;

  const subject = encodeURIComponent("Portfolio Contact from " + name);
  const body = encodeURIComponent(
    "Name: " + name + "\n" +
    "Email: " + email + "\n\n" +
    message
  );

  window.location.href =
    "mailto:devendrareddypalavala46@gmail.com?subject=" +
    subject +
    "&body=" +
    body;
});