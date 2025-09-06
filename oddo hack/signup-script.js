// DOM Elements
const signupForm = document.getElementById('signupForm');
const displayNameInput = document.getElementById('displayName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const displayNameError = document.getElementById('displayNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const signupBtn = document.querySelector('.signup-btn');
const agreeTermsCheckbox = document.getElementById('agreeTerms');

// Simulated database for unique email check
const existingEmails = ['test@example.com', 'user@demo.com', 'admin@test.com'];

// Validation Functions
function validateDisplayName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    return nameRegex.test(name.trim());
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function checkEmailUniqueness(email) {
    // Simulate API call to check if email exists
    return !existingEmails.includes(email.toLowerCase());
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.classList.remove('show');
    errorElement.textContent = '';
}

function showSuccess(input) {
    input.classList.add('success');
    setTimeout(() => {
        input.classList.remove('success');
    }, 2000);
}

// Simulate secure password hashing (bcrypt-like)
function hashPassword(password) {
    // In real implementation, this would use bcrypt or similar
    // For demo purposes, we'll simulate the process
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate hashing process
            const hashedPassword = btoa(password + '_hashed_' + Date.now());
            resolve(hashedPassword);
        }, 500);
    });
}

function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    clearError(displayNameInput, displayNameError);
    clearError(emailInput, emailError);
    clearError(passwordInput, passwordError);
    clearError(confirmPasswordInput, confirmPasswordError);
    
    // Display Name validation
    const displayName = displayNameInput.value.trim();
    if (!displayName) {
        showError(displayNameInput, displayNameError, 'Display name is required');
        isValid = false;
    } else if (!validateDisplayName(displayName)) {
        showError(displayNameInput, displayNameError, 'Display name must be 2-30 characters and contain only letters and spaces');
        isValid = false;
    }
    
    // Email validation
    const email = emailInput.value.trim();
    if (!email) {
        showError(emailInput, emailError, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
    } else if (!checkEmailUniqueness(email)) {
        showError(emailInput, emailError, 'This email is already registered. Please use a different email.');
        isValid = false;
    }
    
    // Password validation
    const password = passwordInput.value;
    if (!password) {
        showError(passwordInput, passwordError, 'Password is required');
        isValid = false;
    } else if (password.length < 8) {
        showError(passwordInput, passwordError, 'Password must be at least 8 characters long');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordInput, passwordError, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
        isValid = false;
    }
    
    // Confirm Password validation
    const confirmPassword = confirmPasswordInput.value;
    if (!confirmPassword) {
        showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        isValid = false;
    }
    
    // Terms agreement validation
    if (!agreeTermsCheckbox.checked) {
        alert('Please agree to the Terms and Conditions to continue');
        isValid = false;
    }
    
    return isValid;
}

// Real-time validation
displayNameInput.addEventListener('blur', function() {
    const name = this.value.trim();
    if (name && !validateDisplayName(name)) {
        showError(this, displayNameError, 'Display name must be 2-30 characters and contain only letters and spaces');
    } else if (name) {
        clearError(this, displayNameError);
        showSuccess(this);
    }
});

emailInput.addEventListener('blur', async function() {
    const email = this.value.trim();
    if (email && !validateEmail(email)) {
        showError(this, emailError, 'Please enter a valid email address');
    } else if (email && !checkEmailUniqueness(email)) {
        showError(this, emailError, 'This email is already registered. Please use a different email.');
    } else if (email) {
        clearError(this, emailError);
        showSuccess(this);
    }
});

passwordInput.addEventListener('blur', function() {
    const password = this.value;
    if (password && password.length < 8) {
        showError(this, passwordError, 'Password must be at least 8 characters long');
    } else if (password && !validatePassword(password)) {
        showError(this, passwordError, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
    } else if (password) {
        clearError(this, passwordError);
        showSuccess(this);
    }
});

confirmPasswordInput.addEventListener('blur', function() {
    const password = passwordInput.value;
    const confirmPassword = this.value;
    if (confirmPassword && password !== confirmPassword) {
        showError(this, confirmPasswordError, 'Passwords do not match');
    } else if (confirmPassword) {
        clearError(this, confirmPasswordError);
        showSuccess(this);
    }
});

// Clear errors on input
displayNameInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this, displayNameError);
    }
});

emailInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this, emailError);
    }
});

passwordInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this, passwordError);
    }
    // Also check confirm password if it has a value
    if (confirmPasswordInput.value) {
        if (this.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        } else {
            clearError(confirmPasswordInput, confirmPasswordError);
        }
    }
});

confirmPasswordInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this, confirmPasswordError);
    }
    // Check if passwords match
    if (this.value && passwordInput.value !== this.value) {
        showError(this, confirmPasswordError, 'Passwords do not match');
    } else if (this.value && passwordInput.value === this.value) {
        clearError(this, confirmPasswordError);
        showSuccess(this);
    }
});

// Form submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    signupBtn.classList.add('loading');
    signupBtn.disabled = true;
    
    try {
        // Simulate secure password hashing
        const hashedPassword = await hashPassword(passwordInput.value);
        
        // Simulate API call for user registration
        await simulateSignup({
            displayName: displayNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: hashedPassword // In real app, this would be the hashed password
        });
        
        // Show success state
        signupBtn.classList.remove('loading');
        signupBtn.classList.add('success');
        
        // Add email to existing emails (simulate database update)
        existingEmails.push(emailInput.value.trim().toLowerCase());
        
        // Redirect after success animation
        setTimeout(() => {
            alert('Account created successfully! Redirecting to login page...');
            window.location.href = 'login.html';
        }, 1500);
        
    } catch (error) {
        // Show error state
        signupBtn.classList.remove('loading');
        signupBtn.disabled = false;
        
        // Show error message
        alert('Registration failed: ' + error.message);
    }
});

// Simulate signup API call
function simulateSignup(userData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure for demo
            const success = Math.random() > 0.2; // 80% success rate
            if (success) {
                console.log('User registered:', {
                    displayName: userData.displayName,
                    email: userData.email,
                    passwordHash: userData.password // In real app, this would be hashed
                });
                resolve({ success: true, user: userData });
            } else {
                reject(new Error('Registration failed. Please try again.'));
            }
        }, 2000);
    });
}

// Social signup handlers
document.querySelector('.google-btn').addEventListener('click', function() {
    alert('Google signup would be implemented here');
    // In a real app, you would integrate with Google OAuth
});

document.querySelector('.facebook-btn').addEventListener('click', function() {
    alert('Facebook signup would be implemented here');
    // In a real app, you would integrate with Facebook OAuth
});

// Terms and conditions handler
document.querySelector('.terms-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Terms and Conditions would be displayed here');
    // In a real app, you would show a modal or redirect to terms page
});

// Add password visibility toggle
const passwordGroup = document.querySelector('#password').parentElement;
const confirmPasswordGroup = document.querySelector('#confirmPassword').parentElement;

// Password toggle for main password field
const passwordToggle = document.createElement('button');
passwordToggle.type = 'button';
passwordToggle.innerHTML = '<i class="fas fa-eye"></i>';
passwordToggle.className = 'password-toggle';
passwordToggle.style.cssText = `
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: color 0.3s ease;
`;

passwordToggle.addEventListener('click', function() {
    const icon = this.querySelector('i');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        icon.className = 'fas fa-eye';
    }
});

// Password toggle for confirm password field
const confirmPasswordToggle = document.createElement('button');
confirmPasswordToggle.type = 'button';
confirmPasswordToggle.innerHTML = '<i class="fas fa-eye"></i>';
confirmPasswordToggle.className = 'password-toggle';
confirmPasswordToggle.style.cssText = `
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: color 0.3s ease;
`;

confirmPasswordToggle.addEventListener('click', function() {
    const icon = this.querySelector('i');
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        confirmPasswordInput.type = 'password';
        icon.className = 'fas fa-eye';
    }
});

// Make password input containers relative for absolute positioning
passwordGroup.style.position = 'relative';
confirmPasswordGroup.style.position = 'relative';
passwordGroup.appendChild(passwordToggle);
confirmPasswordGroup.appendChild(confirmPasswordToggle);

// Add some interactive animations
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        const inputs = Array.from(document.querySelectorAll('input:not([type="checkbox"])'));
        const currentIndex = inputs.indexOf(e.target);
        const nextInput = inputs[currentIndex + 1];
        
        if (nextInput) {
            nextInput.focus();
        } else {
            signupForm.dispatchEvent(new Event('submit'));
        }
    }
});
