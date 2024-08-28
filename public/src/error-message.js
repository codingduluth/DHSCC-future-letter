function displayErrorMessage(errorMsg) {
  document.querySelector('.msg').innerText = errorMsg; // Set the error message text
  const alertBox = document.querySelector('.alert');
  alertBox.classList.add('show');
  alertBox.classList.remove('hide');
  alertBox.classList.add('showAlert');
  setTimeout(function () {
    alertBox.classList.remove('show');
    alertBox.classList.add('hide');
  }, 5000);
}

document.querySelector('.close-btn').addEventListener('click', function () {
  const alertBox = document.querySelector('.alert');
  alertBox.classList.remove('show');
  alertBox.classList.add('hide');
});
