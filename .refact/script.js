// Get the form and the global message area
const form = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

// ---------- Helper functions for showing errors ----------
function showError(input, message) {
    const error = document.getElementById('err-' + input.id);
    if (error) {
        error.textContent = message;
    }
    input.classList.add('invalid');
    input.classList.remove('valid');
    input.setAttribute('aria-invalid', 'true');
}

function showSuccess(input) {
    const error = document.getElementById('err-' + input.id);
    if (error) {
        error.textContent = '';
    }
    input.classList.remove('invalid');
    input.classList.add('valid');
    input.setAttribute('aria-invalid', 'false');
}

// ---------- Validation functions for each field ----------
function validateStudentId() {
    const input = document.getElementById('studentId');
    const value = input.value.trim();
    const pattern = /^\d{4}-\d{5}$/;

    if (value === '') {
        showError(input, 'Student ID is required.');
        return false;
    } else if (!pattern.test(value)) {
        showError(input, 'Use format: 2024-00123');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function validateFullName() {
    const input = document.getElementById('fullName');
    const value = input.value.trim();

    if (value === '') {
        showError(input, 'Full name is required.');
        return false;
    } else if (value.length < 3) {
        showError(input, 'Name is too short.');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function validateEmail() {
    const input = document.getElementById('email');
    const value = input.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        showError(input, 'Email is required.');
        return false;
    } else if (!pattern.test(value)) {
        showError(input, 'Enter a valid email address.');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function validatePhone() {
    const input = document.getElementById('phone');
    const value = input.value.trim();
    const pattern = /^09\d{9}$/;

    if (value === '') {
        showError(input, 'Phone number is required.');
        return false;
    } else if (!pattern.test(value)) {
        showError(input, 'Use 11-digit number starting with 09.');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function validateDOB() {
    const input = document.getElementById('dob');
    const value = input.value;

    if (value === '') {
        showError(input, 'Date of birth is required.');
        return false;
    } else {
        const birth = new Date(value);
        const today = new Date();
        if (birth >= today) {
            showError(input, 'Date of birth must be in the past.');
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }
}

function validateGender() {
    const radios = document.getElementsByName('gender');
    let selected = false;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selected = true;
        }
    }

    const error = document.getElementById('err-gender');
    if (!selected) {
        error.textContent = 'Please select a gender.';
        return false;
    } else {
        error.textContent = '';
        return true;
    }
}

function validateProgram() {
    const input = document.getElementById('program');

    if (input.value === '') {
        showError(input, 'Please select a program.');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function validateYearLevel() {
    const input = document.getElementById('yearLevel');

    if (input.value === '') {
        showError(input, 'Please select a year level.');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function validatePassword() {
    const input = document.getElementById('password');
    const value = input.value;

    if (value === '') {
        showError(input, 'Password is required.');
        return false;
    } else if (value.length < 8) {
        showError(input, 'Password must be at least 8 characters.');
        return false;
    } else if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {
        showError(input, 'Use uppercase, lowercase, and a number.');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function validateConfirmPassword() {
    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');

    if (confirm.value === '') {
        showError(confirm, 'Please confirm your password.');
        return false;
    } else if (confirm.value !== pass.value) {
        showError(confirm, 'Passwords do not match.');
        return false;
    } else {
        showSuccess(confirm);
        return true;
    }
}

function validateAddress() {
    const input = document.getElementById('address');
    const value = input.value.trim();

    if (value === '') {
        showError(input, 'Address is required.');
        return false;
    } else if (value.length < 5) {
        showError(input, 'Address is too short.');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function validateAgreement() {
    const checkbox = document.getElementById('agreement');
    const error = document.getElementById('err-agreement');

    if (!checkbox.checked) {
        error.textContent = 'You must agree before submitting.';
        checkbox.classList.add('invalid');
        return false;
    } else {
        error.textContent = '';
        checkbox.classList.remove('invalid');
        checkbox.classList.add('valid');
        return true;
    }
}

// ---------- Master validator for a single field ----------
function validateField(field) {
    if (field.id === 'studentId') return validateStudentId();
    if (field.id === 'fullName') return validateFullName();
    if (field.id === 'email') return validateEmail();
    if (field.id === 'phone') return validatePhone();
    if (field.id === 'dob') return validateDOB();
    if (field.id === 'program') return validateProgram();
    if (field.id === 'yearLevel') return validateYearLevel();
    if (field.id === 'password') return validatePassword();
    if (field.id === 'confirmPassword') return validateConfirmPassword();
    if (field.id === 'address') return validateAddress();
    if (field.id === 'agreement') return validateAgreement();
    return true;
}

// ---------- Attach events to each field ----------
const fields = form.querySelectorAll('input, select, textarea');

for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    // Validate when user leaves the field
    field.addEventListener('blur', function(e) {
        if (e.target.name === 'gender') {
            validateGender();
        } else {
            validateField(e.target);
        }
    });

    // Re-validate while typing if there's already an error
    field.addEventListener('input', function(e) {
        if (e.target.classList.contains('invalid')) {
            if (e.target.name === 'gender') {
                validateGender();
            } else {
                validateField(e.target);
            }
        }
    });

    // For radio, select, checkbox: validate on change
    field.addEventListener('change', function(e) {
        if (e.target.name === 'gender') {
            validateGender();
        } else if (e.target.tagName === 'SELECT' || e.target.id === 'agreement') {
            validateField(e.target);
        }
    });
}

// ---------- Form submission ----------
form.addEventListener('submit', function(e) {
    e.preventDefault(); // stop the page from reloading

    // Run all validations
    const results = [
        validateStudentId(),
        validateFullName(),
        validateEmail(),
        validatePhone(),
        validateDOB(),
        validateGender(),
        validateProgram(),
        validateYearLevel(),
        validatePassword(),
        validateConfirmPassword(),
        validateAddress(),
        validateAgreement()
    ];

    // Check if everything passed
    let allValid = true;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === false) {
            allValid = false;
        }
    }

    if (allValid) {
        formMessage.textContent = 'Registration successful! All fields are valid.';
        formMessage.classList.add('show');
        formMessage.classList.remove('error');
        form.reset();
        clearAllStyles();
    } else {
        formMessage.textContent = 'Please fix the errors in the form.';
        formMessage.classList.add('show', 'error');
    }
});

// ---------- Reset button ----------
document.getElementById('resetBtn').addEventListener('click', function() {
    // The form.reset() is automatic, but we need to clear styles after a tiny delay
    setTimeout(function() {
        clearAllStyles();
        formMessage.textContent = '';
        formMessage.classList.remove('show', 'error');
    }, 10);
});

// ---------- Utility to clear all error/success styles ----------
function clearAllStyles() {
    const marked = document.querySelectorAll('.invalid, .valid');
    for (let i = 0; i < marked.length; i++) {
        marked[i].classList.remove('invalid', 'valid');
    }

    const errors = document.querySelectorAll('.error-message');
    for (let i = 0; i < errors.length; i++) {
        errors[i].textContent = '';
    }
}