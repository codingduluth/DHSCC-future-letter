const token = localStorage.getItem('token');
const name = localStorage.getItem('name');
if (!token) {
  // If there's no token, redirect to the login page
  window.location.href = '/login';
}

const textarea = document.querySelector('.auto-growing-textarea');
const dynamicName = document.querySelector('.dynamic-name');
const getLetterButton = document.querySelector('.get-button');
const formWrap = document.querySelector('.form-wrap');

var end = new Date('05/15/2025 2:00 PM');
var now = new Date();

getLetterButton.addEventListener('click', () => {
  if (now < end) {
    displayErrorMessage('Countdown is not over yet!');
  } else {
    async function getLetterRequest() {
      try {
        const response = await fetch('/api/v1/letters', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          formWrap.innerHTML = `
          <p>
          ${data.letter}
        </p>
          `;
          displayErrorMessage('Received Succesfully!');
        } else {
          const error = await response.json();
          displayErrorMessage(error.msg);
        }
      } catch (error) {
        displayErrorMessage(error.msg);
      }
    }
    getLetterRequest();
  }
});

textarea.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});

dynamicName.innerHTML = `Welcome ${name}!`;

document
  .getElementById('letter-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    let letter = document.getElementById('letter-input').value;

    try {
      const response = await fetch('/api/v1/letters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ letter }),
      });

      if (response.ok) {
        const data = await response.json();
        document.getElementById('letter-input').value = '';
        displayErrorMessage('Sent Succesfully!');
      } else {
        const error = await response.json();
        displayErrorMessage(error.msg);
      }
    } catch (error) {
      displayErrorMessage(error.msg);
    }
  });
