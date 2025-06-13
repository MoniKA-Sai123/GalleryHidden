// pro.js



let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUserId = null;
let hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPhotos')) || {};

// Function to register a new user
function registerUser() {
    const newUserId = document.getElementById('newUserId').value;
    const newPassword = document.getElementById('newPassword').value;
    const mobileNumber = document.getElementById('mobileNumber').value;

    if (!newUserId || !newPassword || !mobileNumber) {
        alert('All fields are required!');
        return;
    }

    users[newUserId] = { password: newPassword, mobileNumber: mobileNumber };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');

    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';

}

// Function to validate the user login
function validateUser() {
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    if (users[userId] && users[userId].password === password) {
        alert('Login successful!');
        currentUserId = userId;

        document.getElementById('login-form').style.display = 'none';
        document.getElementById('photo-selection').style.display = 'block';
    } else {
        alert('Invalid User ID or Password!');
    }
}

// Function to show the forgot password form
function showForgotPasswordForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'block';
}

// Function to send OTP to the user's mobile number
function sendOTP() {
    const forgotMobileNumber = document.getElementById('forgotMobileNumber').value;
    const userId = Object.keys(users).find(id => users[id].mobileNumber === forgotMobileNumber);

    if (!userId) {
        alert('Mobile number not found!');
        return;
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    users[userId].otp = otp;
    localStorage.setItem('users', JSON.stringify(users));
    alert(OTP sent to ${forgotMobileNumber}: ${otp});

    currentUserId = userId;

    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('otp-form').style.display = 'block';
}

// Function to verify the OTP
function verifyOTP() {
    const otpInput = document.getElementById('otpInput').value;

    if (users[currentUserId].otp == otpInput) {
        alert('OTP verified successfully!');
        document.getElementById('otp-form').style.display = 'none';
        document.getElementById('reset-password-form').style.display = 'block';
    } else {
        alert('Invalid OTP!');
    }
}

// Function to reset the password
function resetPassword() {
    const newPassword = document.getElementById('newPasswordReset').value;

    if (!newPassword) {
        alert('Password cannot be empty!');
        return;
    }

    users[currentUserId].password = newPassword;
    delete users[currentUserId].otp;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Password reset successful!');

    document.getElementById('reset-password-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Function to hide selected photos
function hidePhotos() {
    const files = document.getElementById('photoInput').files;
    const photos = [];

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photos.push(e.target.result);
            if (photos.length === files.length) {
                hiddenPhotos[currentUserId] = hiddenPhotos[currentUserId] || [];
                hiddenPhotos[currentUserId].push(...photos);
                localStorage.setItem('hiddenPhotos', JSON.stringify(hiddenPhotos));
                alert('Photos hidden successfully!');
                // Simulate removing photos from gallery
                document.getElementById('photoInput').value = ''; // Clear input
            }
        };
        reader.readAsDataURL(files[i]);
    }
}

// Function to show hidden photos
function showHiddenPhotos() {
    document.getElementById('photo-selection').style.display = 'none';
    document.getElementById('hidden-photos').style.display = 'block';
    displayHiddenPhotos();
}

// Function to display hidden photos
function displayHiddenPhotos() {
    const photosContainer = document.getElementById('photosContainer');
    photosContainer.innerHTML = '';

    if (hiddenPhotos[currentUserId] && hiddenPhotos[currentUserId].length > 0) {
        hiddenPhotos[currentUserId].forEach(photo => {
            const img = document.createElement('img');
            img.src = photo;
            img.className = 'hidden-photo';
            photosContainer.appendChild(img);
        });
    } else {
        photosContainer.innerHTML = '<p>No hidden photos available.</p>';
    }
}
// Function to show login form and hide registration form
function showLoginForm() {
    document.getElementById("Registration-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}
function showRegisterForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("Registration-form").style.display = "block";
}