function daysInMonth(y, m) {
  return new Date(y, m, 0).getDate();
}

const dobInput = document.getElementById('dob');
const ageOnInput = document.getElementById('ageOn');
const btn = document.getElementById('calcBtn');
const result = document.getElementById('result');

btn.addEventListener('click', () => {
  if (btn.dataset.mode === 'reset') {
    resetAll();
  } else {
    calculate();
  }
});

function calculate() {
  const dobVal = dobInput.value;
  const onVal = ageOnInput.value;

  if (!dobVal || !onVal) {
    result.textContent = '⚠ Please select both Date of Birth and Age On date.';
    return;
  }

  const birth = new Date(dobVal + 'T00:00:00');
  const target = new Date(onVal + 'T00:00:00');

  if (target < birth) {
    result.textContent = '⚠ Age On date must be the same or after Date of Birth.';
    return;
  }

  let y = target.getFullYear() - birth.getFullYear();
  let m = target.getMonth() - birth.getMonth();
  let d = target.getDate() - birth.getDate();

  if (d < 0) {
    m -= 1;
    d += daysInMonth(target.getFullYear(), target.getMonth());
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }

  const totalMonths = y * 12 + m;
  const msDiff = target.getTime() - birth.getTime();
  const totalDays = Math.floor(msDiff / 86400000);
  const totalHours = Math.floor(msDiff / 3600000);

  const niceTarget = target.toLocaleDateString();
  result.textContent =
    `Your age on ${niceTarget}:\n` +
    `${y} years, ${m} months, ${d} days\n\nAlso:\n` +
    `• Total months: ${totalMonths}\n` +
    `• Total days: ${totalDays}\n` +
    `• Total hours: ${totalHours}`;

  btn.textContent = 'Reset';
  btn.classList.add('reset');
  btn.dataset.mode = 'reset';
}

function resetAll() {
  dobInput.value = '';
  ageOnInput.value = '';
  result.textContent = '';
  btn.textContent = 'Calculate';
  btn.classList.remove('reset');
  delete btn.dataset.mode;
}

(function prefillToday() {
  const t = new Date(),
    yyyy = t.getFullYear(),
    mm = String(t.getMonth() + 1).padStart(2, '0'),
    dd = String(t.getDate()).padStart(2, '0');
  ageOnInput.value = `${yyyy}-${mm}-${dd}`;
})();