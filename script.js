/**
 * ALT School - Form Input Validation with JavaScript
 * Author: Isaac Sackey Sackitey
 * Module: JavaScript Fundamentals
 * Date: 10th May 2026
 */

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const inputs = form.querySelectorAll("input");

  // === VALIDATION FUNCTIONS -- Where all validation happens===

  // Validate Full Name: not empty, at least 2 words
  function validateFullName(name) {
    const trimmed = name.trim();
    if (!trimmed) return "Full name is required";
    const words = trimmed.split(/\s+/).filter((word) => word.length > 0);
    if (words.length < 2) return "Please enter your first and last name";
    return null;
  }

  // Validate Email: standard format
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email address is required";
    if (!emailRegex.test(email))
      return "Please enter a valid email (johndoe@example.com)";
    return null;
  }

  // Validate Password: 8+ chars, 1 uppercase, 1 number, 1 special char
  function validatePassword(password) {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must include at least one uppercase letter";
    if (!/[0-9]/.test(password))
      return "Password must include at least one number";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Password must include at least one special character (!@#$%^&*)";
    }
    return null;
  }

  // Validate Confirm Password: must match password
  function validateConfirmPassword(confirmPass, password) {
    if (!confirmPass) return "Please confirm your password";
    if (confirmPass !== password) return "Passwords do not match";
    return null;
  }

  // Validate Age: must be 18 or older
  function validateAge(age) {
    if (!age) return "Age is required";
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120)
      return "Please enter a valid age";
    if (ageNum < 18) return "You must be 18 years or older to register";
    return null;
  }

  // === UI FEEDBACK FUNCTIONS ===

  // Show error on field
  function showError(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = message;
    input.classList.add("invalid");
    input.classList.remove("valid");
  }

  // Clear error on field
  function clearError(input, errorId) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = "";
    input.classList.remove("invalid");
  }

  // Mark field as valid
  function markValid(input) {
    input.classList.add("valid");
    input.classList.remove("invalid");
  }

  // Show success message
  function showSuccess(userName) {
    const successMsg = document.getElementById("successMessage");
    const userNameDisplay = document.getElementById("userNameDisplay");
    userNameDisplay.textContent = userName;
    successMsg.classList.remove("hidden");

    // Hide form after success
    form.style.display = "none";

    // Reset after 5 seconds
    setTimeout(() => {
      form.reset();
      form.style.display = "block";
      successMsg.classList.add("hidden");
      inputs.forEach((input) => {
        input.classList.remove("valid", "invalid");
      });
    }, 5000);
  }

  // === REAL-TIME VALIDATION
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      const id = this.id;
      const value = this.value;

      switch (id) {
        case "fullName": {
          const error = validateFullName(value);
          if (error) {
            showError(this, "fullNameError", error);
          } else {
            clearError(this, "fullNameError");
            markValid(this);
          }
          break;
        }
        case "email": {
          const error = validateEmail(value);
          if (error) {
            showError(this, "emailError", error);
          } else {
            clearError(this, "emailError");
            markValid(this);
          }
          break;
        }
        case "password": {
          const error = validatePassword(value);
          if (error) {
            showError(this, "passwordError", error);
          } else {
            clearError(this, "passwordError");
            markValid(this);

            // Re-validate confirm password if it has a value
            const confirmInput = document.getElementById("confirmPassword");
            if (confirmInput.value) {
              const confirmError = validateConfirmPassword(
                confirmInput.value,
                value,
              );
              if (confirmError) {
                showError(confirmInput, "confirmPasswordError", confirmError);
              } else {
                clearError(confirmInput, "confirmPasswordError");
                markValid(confirmInput);
              }
            }
          }
          break;
        }
        case "confirmPassword": {
          const password = document.getElementById("password").value;
          const error = validateConfirmPassword(value, password);
          if (error) {
            showError(this, "confirmPasswordError", error);
          } else {
            clearError(this, "confirmPasswordError");
            markValid(this);
          }
          break;
        }
        case "age": {
          const error = validateAge(value);
          if (error) {
            showError(this, "ageError", error);
          } else {
            clearError(this, "ageError");
            markValid(this);
          }
          break;
        }
      }
    });

    // Clear visual state on input
    input.addEventListener("input", function () {
      if (this.classList.contains("invalid")) {
        clearError(this, `${this.id}Error`);
      }
    });
  });

  // === FORM SUBMISSION HANDLER ===
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const age = document.getElementById("age").value;

    // Validate all fields
    const fullNameError = validateFullName(fullName);
    if (fullNameError) {
      showError(
        document.getElementById("fullName"),
        "fullNameError",
        fullNameError,
      );
      isValid = false;
    } else {
      clearError(document.getElementById("fullName"), "fullNameError");
      markValid(document.getElementById("fullName"));
    }

    const emailError = validateEmail(email);
    if (emailError) {
      showError(document.getElementById("email"), "emailError", emailError);
      isValid = false;
    } else {
      clearError(document.getElementById("email"), "emailError");
      markValid(document.getElementById("email"));
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      showError(
        document.getElementById("password"),
        "passwordError",
        passwordError,
      );
      isValid = false;
    } else {
      clearError(document.getElementById("password"), "passwordError");
      markValid(document.getElementById("password"));
    }

    const confirmError = validateConfirmPassword(confirmPassword, password);
    if (confirmError) {
      showError(
        document.getElementById("confirmPassword"),
        "confirmPasswordError",
        confirmError,
      );
      isValid = false;
    } else {
      clearError(
        document.getElementById("confirmPassword"),
        "confirmPasswordError",
      );
      markValid(document.getElementById("confirmPassword"));
    }

    const ageError = validateAge(age);
    if (ageError) {
      showError(document.getElementById("age"), "ageError", ageError);
      isValid = false;
    } else {
      clearError(document.getElementById("age"), "ageError");
      markValid(document.getElementById("age"));
    }

    // Handle result
    if (!isValid) {
      // Alert first error for clarity
      const firstError = document.querySelector(".error-msg:not(:empty)");
      if (firstError) {
        alert("⚠️ " + firstError.textContent);
      } else {
        alert("⚠️ Please correct the errors above");
      }
      return;
    }

    // All valid - show success
    showSuccess(fullName.split(" ")[0]); // Show first name in success message
    alert("✅ Registration successful! Welcome, " + fullName.split(" ")[0]);
  });
});
