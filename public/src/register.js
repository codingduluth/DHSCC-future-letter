localStorage.clear();

document
  .getElementById('register-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const formData = {
      name: document.getElementById('full-name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };

    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result.user.token;
        localStorage.setItem('token', token);
        localStorage.setItem('name', result.user.name); // Store name

        window.location.href = '/html/letters.html';
        // Handle success (e.g., redirect to another page)
      } else {
        const error = await response.json();
        displayErrorMessage(error.msg);

        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(error);
      alert('An unexpected error occurred. Please try again.');
    }
  });
