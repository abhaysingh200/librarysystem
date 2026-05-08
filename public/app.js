const seatContainer = document.getElementById("seatContainer");

async function loadSeats(){

const res = await fetch("/api/seats");
const seats = await res.json();

seatContainer.innerHTML = "";

seats.forEach(seat=>{

    const div = document.createElement("div");

    div.className = "seat";

    if(seat.status === "booked"){
        div.classList.add("booked");
    }

    div.innerText = seat.number;

    div.onclick = async ()=>{

        const res = await fetch(`/api/book/${seat.id}`,{
            method:"POST"
        });

        const data = await res.json();

        alert(data.message);

        loadSeats();
    };

    seatContainer.appendChild(div);
});
}

loadSeats();
