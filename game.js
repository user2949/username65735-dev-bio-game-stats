const REFRESH_INTERVAL = 60;
let countdownRemaining = REFRESH_INTERVAL;
let countdownTimer;
let refreshTimer;

const el = (id) => document.getElementById(id);
const formatDate = (value) => value ? new Date(value).toLocaleString() : "...";
const setStats = (data) => {
  el("playing").textContent = data ? data.playing.toLocaleString() : "...";
  el("visits").textContent = data ? data.visits.toLocaleString() : "...";
  el("created").textContent = data ? formatDate(data.created) : "...";
  el("updated").textContent = data ? formatDate(data.updated) : "...";
  el("favorited").textContent = data ? data.favorited.toLocaleString() : "...";
  el("upvotes").textContent = data ? data.upVotes.toLocaleString() : "...";
  el("downvotes").textContent = data ? data.downVotes.toLocaleString() : "...";
  el("vote-summary").textContent = data ? `👍 ${data.upPercent.toFixed(2)}%   |   👎 ${data.downPercent.toFixed(2)}%` : "👍 ...%   |   👎 ...%";
};
async function fetchData() {
  try {
    const response = await fetch("/api/stats", { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) { console.warn("Could not fetch Roblox stats", error); return null; }
}
function startCountdown() { clearInterval(countdownTimer); countdownRemaining = REFRESH_INTERVAL; countdownTimer = setInterval(() => { el("refresh-status").textContent = `Refreshing in ${countdownRemaining} seconds`; if (countdownRemaining > 0) countdownRemaining -= 1; }, 1000); }
async function updateUI() { clearTimeout(refreshTimer); const data = await fetchData(); setStats(data); startCountdown(); refreshTimer = setTimeout(updateUI, REFRESH_INTERVAL * 1000); }
el("refresh-button").addEventListener("click", updateUI);
updateUI();
