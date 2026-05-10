# 🔐 Form Input Validation with JavaScript

**Author:** Isaac Sackey Sackitey  
**Program:** ALT School - Backend Engineering  
**Module:** JavaScript Fundamentals  
**Date:** 10th May 2026  

## 📖 Project Overview
A user registration form with comprehensive client-side validation using vanilla JavaScript. This project demonstrates understanding of the Window API (`alert`), DOM manipulation, regex patterns, and user feedback design as part of the ALT School Backend Engineering curriculum.

## 🛠️ Tech Stack
- HTML5 (Semantic Form Structure)
- CSS3 (Visual Feedback, Transitions, Responsive Design)
- Vanilla JavaScript (Validation Logic, DOM Events, Window API)

## 📂 Project Structure
├── index.html # Registration form markup  
├── style.css # Styling + visual validation states  
├── script.js # Validation logic + event handlers  
└── README.md # Project documentation  


## 🚀 How to View
1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. View live via GitHub Pages: `https://yourusername.github.io/form-validation-js/`

## ✅ Assignment Requirements Met
- [x] **HTML Structure** (2/2): Properly labeled form with all required fields (`fullName`, `email`, `password`, `confirmPassword`, `age`)
- [x] **Validation Logic** (4/4): 
  - Full Name: Not empty, ≥2 words
  - Email: Valid format via regex
  - Password: 8+ chars, uppercase, number, special char
  - Confirm Password: Must match password
  - Age: Must be ≥18
- [x] **Error/Success Feedback** (2/2): `alert()` for errors + success, inline error messages, visual field states
- [x] **Code Quality** (1/1): Clean, modular functions, clear comments, consistent formatting
- [x] **Bonus Feature** (1/1): Real-time validation on `blur` + visual feedback (`.valid`/`.invalid` classes, color transitions)

## 🔍 Validation Rules Summary
| Field | Rule |
|-------|------|
| Full Name | Required, at least 2 words |
| Email | Valid format: `johndoe@example.com` |
| Password | ≥8 chars, 1 uppercase, 1 number, 1 special char |
| Confirm Password | Must exactly match Password |
| Age | Numeric, 18–120 |

## 📝 Notes
- All validation occurs client-side using vanilla JavaScript (no frameworks).
- Uses `alert()` for error/success messages per assignment requirements.
- Form prevents submission until all fields pass validation.
