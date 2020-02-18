/**
 * Variables
 */
const signupButton = document.getElementById('signup-button'),
    loginButton = document.getElementById('login-button'),
    userForms = document.getElementById('user_options-forms')
/**
 * Add event listener to the "Sign Up" button
 */
signupButton.addEventListener('click', () => {
  userForms.scrollTop = 0; // For Safari
  userForms.classList.remove('bounceRight')
  userForms.classList.add('bounceLeft')
  userForms.style.overflow="auto"
}, false)

/**
 * Add event listener to the "Login" button
 */
loginButton.addEventListener('click', () => {
  userForms.scrollTop = 0; // For Safari
  userForms.classList.remove('bounceLeft')
  userForms.classList.add('bounceRight')
  userForms.style.overflow="hidden"
}, false)