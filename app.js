const form = document.querySelector('form');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

const outputYears = document.getElementById('output-years');
const outputMonths = document.getElementById('output-months');
const outputDays = document.getElementById('output-days');

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

function validate() {
  let isValid = true;
  const daysInMonth = new Date(yearInput.value, monthInput.value, 0).getDate();
  console.log(daysInMonth);
  const inputs = document.querySelectorAll('input');
  inputs.forEach((inputEl) => {
    const parentEl = inputEl.parentElement;
    // check for empty inputs
    if (!inputEl.value) {
      parentEl.querySelector('label').style.color = '#ff5757';
      inputEl.style.borderColor = '#ff5757';
      parentEl.querySelector('small').innerText = 'This field is required';
      isValid = false;
    }
    // check year
    else if (yearInput.value > currentDate.getFullYear()) {
      yearInput.parentElement.querySelector('label').style.color = '#ff5757';
      yearInput.style.borderColor = '#ff5757';
      yearInput.parentElement.querySelector('small').innerText =
        'Must be in the past';
      isValid = false;
    }
    // check month
    else if (monthInput.value <= 0 || monthInput.value > 12) {
      monthInput.parentElement.querySelector('label').style.color = '#ff5757';
      monthInput.style.borderColor = '#ff5757';
      monthInput.parentElement.querySelector('small').innerText =
        'Must be a valid month';
      isValid = false;
    }
    // check day
    else if (dayInput.value <= 0 || dayInput.value > daysInMonth) {
      dayInput.parentElement.querySelector('label').style.color = '#ff5757';
      dayInput.style.borderColor = '#ff5757';
      dayInput.parentElement.querySelector('small').innerText =
        'Must be a valid day';
      isValid = false;
    } else {
      parentEl.querySelector('label').style.color = '#716f6f';
      inputEl.style.borderColor = '#dbdbdb';
      parentEl.querySelector('small').innerText = '';
      isValid = true;
    }
  });
  return isValid;
}

function calculateAge() {
  const dateOfBirth = new Date(
    yearInput.value,
    monthInput.value - 1,
    dayInput.value
  );

  let yearsDifference = currentYear - dateOfBirth.getFullYear();
  let monthsDifference = currentMonth - dateOfBirth.getMonth();
  let daysDifference = currentDay - dateOfBirth.getDate();
  const previousMonthsDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  // when dob day is greater than current day
  if (daysDifference < 0) {
    monthsDifference -= 1;
    daysDifference += previousMonthsDays.getDate();
  }
  // when dob month is greater than current month
  if (monthsDifference < 0) {
    yearsDifference--;
    monthsDifference += 12;
  }

  outputYears.innerText = yearsDifference;
  outputMonths.innerText = monthsDifference;
  outputDays.innerText = daysDifference;
}

function handleSubmit(e) {
  e.preventDefault();
  if (validate()) {
    calculateAge();
  }
}

form.addEventListener('submit', handleSubmit);
