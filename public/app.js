const seatContainer = document.getElementById("seatContainer");
const STORAGE_KEY = "libraryProSeats";

function createSeats() {
  return Array.from({ length: 50 }, (_, idx) => ({
    id: idx + 1,
    number: idx + 1,
    status: "free"
  }));
}

function loadSeatsFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : createSeats();
}

function saveSeatsToStorage(seats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seats));
}

function renderSeats() {
  const seats = loadSeatsFromStorage();
  seatContainer.innerHTML = "";

  seats.forEach((seat) => {
    const div = document.createElement("div");
    div.className = "seat";
    if (seat.status === "booked") {
      div.classList.add("booked");
    }
    div.innerText = seat.number;

    div.onclick = () => {
      if (seat.status === "booked") {
        alert("This seat is already booked.");
        return;
      }
      seat.status = "booked";
      saveSeatsToStorage(seats);
      renderSeats();
      alert("Seat booked successfully");
    };

    seatContainer.appendChild(div);
  });
}

renderSeats();
