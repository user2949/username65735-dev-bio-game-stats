const sourceUtcOffset = 7;
const localTime = document.querySelector("#local-time");

function formatTimeForVisitor() {
  const visitorUtcOffset = -new Date().getTimezoneOffset() / 60;
  const visitorHour = (12 + visitorUtcOffset - sourceUtcOffset + 24) % 24;
  const hour = Math.floor(visitorHour);
  const minute = Math.round((visitorHour - hour) * 60);

  const displayHour = hour % 12 || 12;
  const period = hour < 12 ? "AM" : "PM";

  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

if (localTime) {
  localTime.textContent = formatTimeForVisitor();
}
