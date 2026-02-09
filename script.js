const form = document.getElementById("signupForm");
const strength = document.getElementById("strength");
const success = document.getElementById("success");

document.getElementById("pass").addEventListener("input", function () {
    const value = this.value;

    if (value.length < 6) strength.textContent = "Weak password";
    else if (value.length < 10) strength.textContent = "Medium strength";
    else strength.textContent = "Strong password";
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    valid &= validate("fname", "Name required");
    valid &= validateEmail("mail");
    valid &= validatePhone("phone");

    if (valid) {
        success.textContent = "Form submitted successfully for Archita Shipurkar!";
        form.reset();
        strength.textContent = "";
    }
});

function validate(id, msg) {
    const el = document.getElementById(id);
    if (el.value.trim() === "") {
        el.nextElementSibling.textContent = msg;
        return false;
    }
    el.nextElementSibling.textContent = "";
    return true;
}

function validateEmail(id) {
    const el = document.getElementById(id);
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(el.value)) {
        el.nextElementSibling.textContent = "Invalid email";
        return false;
    }
    el.nextElementSibling.textContent = "";
    return true;
}

function validatePhone(id) {
    const el = document.getElementById(id);

    if (!/^\d{10}$/.test(el.value)) {
        el.nextElementSibling.textContent = "Enter 10-digit phone";
        return false;
    }
    el.nextElementSibling.textContent = "";
    return true;
}
