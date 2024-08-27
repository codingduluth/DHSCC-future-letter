document
  .getElementById('register-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const formData = {
      fullname: document.getElementById('full-name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };

    try {
      const response = await fetch('https://your-backend-url.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Registration successful!');
        // Handle success (e.g., redirect to another page)
      } else {
        const error = await response.json();
        alert('Registration failed: ' + error.message);
        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  });
