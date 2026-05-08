let seats = Array.from({ length: 50 }, (_, idx) => ({
  id: idx + 1,
  number: idx + 1,
  status: "free"
}));

module.exports = function handler(req, res) {
  const { method, url } = req;
  const match = url.match(/^\/api\/(seats|book\/([0-9]+))$/);

  if (!match) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  if (match[1] === "seats" && method === "GET") {
    res.status(200).json(seats);
    return;
  }

  if (match[1].startsWith("book/") && method === "POST") {
    const id = Number(match[2]);
    const seat = seats.find((s) => s.id === id);

    if (!seat) {
      res.status(404).json({ message: "Seat not found" });
      return;
    }

    if (seat.status === "booked") {
      res.status(400).json({ message: "Seat already booked" });
      return;
    }

    seat.status = "booked";
    res.status(200).json({ message: "Seat booked successfully" });
    return;
  }

  res.status(405).json({ message: "Method not allowed" });
};
