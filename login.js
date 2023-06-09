hashCode = function(s) {
  return s.split("").reduce(function(a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
}

const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const message = document.getElementById('message');
const waitTimes = [1000, 2000, 5000, 10000, 10000, 30000];

let remainingAttempts = 3;
let timer = null;
let timesReset = 0;

function login(event) {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  if (username === 'admin' && hashCode(password) === 261855461) {
    message.innerHTML = 'Login successful. Click <a href="https://sites.google.com/view/mymaindatabasesitebynexus/home?authuser=1">here</a> to go to the admin panel.';
    message.classList.remove('error');
  } else {
    remainingAttempts--;
    message.innerHTML = `Incorrect username or password. ${remainingAttempts} attempts remaining.`;
    message.classList.add('error');
    if (remainingAttempts === 0) {
      loginForm.reset();
      usernameInput.disabled = true;
      passwordInput.disabled = true;
      loginBtn.disabled = true;message.innerHTML = 'You have been logged out. Please wait ' + (Number(waitTimes[timesReset]) / 1000) + ' seconds to try again.';
      timer = setTimeout(() => {
        usernameInput.disabled = false;
        passwordInput.disabled = false;
        loginBtn.disabled = false;
        message.innerHTML = '';
        remainingAttempts = 3;
        if (timesReset < 5) {
          timesReset++;
        }
      }, waitTimes[timesReset]);
    }
  }
}

loginForm.addEventListener('submit', login);
