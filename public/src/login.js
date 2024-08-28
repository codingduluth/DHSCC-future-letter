localStorage.clear();

document
  .getElementById('login-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.user.token); // Store JWT token
        localStorage.setItem('name', data.user.name); // Store name

        // Fetch the /letters content with the Bearer token
        const token = data.user.token;
        window.location.href = '/html/letters.html';
      } else {
        const error = await response.json();
        displayErrorMessage(error.msg);
      }
    } catch (error) {
      displayErrorMessage(error);
    }
  });
