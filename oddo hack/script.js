
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginBtn = document.querySelector('.login-btn');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
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

function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    clearError(emailInput, emailError);
    clearError(passwordInput, passwordError);
    
    // Email validation
    const email = emailInput.value.trim();
    if (!email) {
        showError(emailInput, emailError, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
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
    
    return isValid;
}

// Real-time validation
emailInput.addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !validateEmail(email)) {
        showError(this, emailError, 'Please enter a valid email address');
    } else {
        clearError(this, emailError);
    }
});

passwordInput.addEventListener('blur', function() {
    const password = this.value;
    if (password && password.length < 8) {
        showError(this, passwordError, 'Password must be at least 8 characters long');
    } else if (password && !validatePassword(password)) {
        showError(this, passwordError, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
    } else {
        clearError(this, passwordError);
    }
});

// Clear errors on input
emailInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this, emailError);
    }
});

passwordInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this, passwordError);
    }
});

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    
    try {
        // Simulate API call
        await simulateLogin();
        
        // Show success state
        loginBtn.classList.remove('loading');
        loginBtn.classList.add('success');
        
        // Store remember me preference
        if (rememberMeCheckbox.checked) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('userEmail', emailInput.value.trim());
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('userEmail');
        }
        
        // Redirect after success animation
        setTimeout(() => {
            alert('Login successful! Redirecting to dashboard...');
            // In a real app, you would redirect to the dashboard
            // window.location.href = '/dashboard';
        }, 1500);
        
    } catch (error) {
        // Show error state
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        
        // Show error message
        showError(emailInput, emailError, 'Invalid email or password');
        showError(passwordInput, passwordError, 'Please check your credentials');
    }
});

// Simulate login API call
function simulateLogin() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure for demo
            const success = Math.random() > 0.3; // 70% success rate
            if (success) {
                resolve({ success: true });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 2000);
    });
}

// Social login handlers
document.querySelector('.google-btn').addEventListener('click', function() {
    alert('Google login would be implemented here');
    // In a real app, you would integrate with Google OAuth
});

document.querySelector('.facebook-btn').addEventListener('click', function() {
    alert('Facebook login would be implemented here');
    // In a real app, you would integrate with Facebook OAuth
});

// Forgot password handler
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    const email = prompt('Enter your email address to reset password:');
    if (email && validateEmail(email)) {
        alert('Password reset link sent to ' + email);
    } else if (email) {
        alert('Please enter a valid email address');
    }
});

// Sign up link handler
document.querySelector('.signup-link a').addEventListener('click', function(e) {
    // Link will naturally navigate to signup.html
    // No need to prevent default or show alert
});

// Load remembered email on page load
window.addEventListener('load', function() {
    const rememberMe = localStorage.getItem('rememberMe');
    const userEmail = localStorage.getItem('userEmail');
    
    if (rememberMe === 'true' && userEmail) {
        emailInput.value = userEmail;
        rememberMeCheckbox.checked = true;
    }
});

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
        const inputs = Array.from(document.querySelectorAll('input'));
        const currentIndex = inputs.indexOf(e.target);
        const nextInput = inputs[currentIndex + 1];
        
        if (nextInput) {
            nextInput.focus();
        } else {
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Add password visibility toggle
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

// Add password visibility toggle button (optional enhancement)
const passwordGroup = document.querySelector('#password').parentElement;
const toggleBtn = document.createElement('button');
toggleBtn.type = 'button';
toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
toggleBtn.className = 'password-toggle';
toggleBtn.style.cssText = `
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

toggleBtn.addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        icon.className = 'fas fa-eye';
    }
});

// Make password input container relative for absolute positioning
passwordGroup.style.position = 'relative';
passwordGroup.appendChild(toggleBtn);
