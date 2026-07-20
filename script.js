document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var form = document.getElementById("enquiryForm");
  if (!form) return;
  var status = document.getElementById("formStatus");
  var submitBtn = document.getElementById("enquirySubmit");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.textContent = "";
    status.style.color = "";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(form)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          form.reset();
          status.textContent = "Thanks — your enquiry's been sent. We'll get back to you soon.";
          status.style.color = "#2347AC";
        } else {
          status.textContent = "Something went wrong sending that. Please try again, or email us directly.";
          status.style.color = "#B3261E";
        }
      })
      .catch(function () {
        status.textContent = "Something went wrong sending that. Please try again, or email us directly.";
        status.style.color = "#B3261E";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send enquiry";
      });
  });
});
