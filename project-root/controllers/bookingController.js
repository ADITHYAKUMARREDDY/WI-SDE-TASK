const db = require("../db");

exports.bookSeat = (req, res) => {
  const { train_id, tickets } = req.body;
  const user_id = req.user.id;

  if (!train_id || !tickets || tickets <= 0) {
    return res.status(400).json({ message: "Invalid train ID or number of tickets" });
  }

  db.query("start transaction", (err) => {
    if (err) {
      console.error("Transaction failed to start: ", err);
      return res.status(500).json({ message: "Transaction failed to start" });
    }

    db.query(
      "SELECT available_seats FROM trains WHERE id = ? FOR UPDATE",
      [train_id],
      (err, results) => {
        if (err || results.length === 0) {
          return db.query("ROLLBACK", () => {
            console.error("Error selecting train: ", err);
            return res.status(400).json({ message: "Train not found" });
          });
        }

        const availableSeats = results[0].available_seats;
        if (availableSeats < tickets) {
          return db.query("ROLLBACK", () => {
            return res
              .status(400)
              .json({ message: "Not enough seats available" });
          });
        }
        db.query(
          "UPDATE trains SET available_seats = available_seats - ? WHERE id = ?",
          [tickets, train_id],
          (err) => {
            if (err) {
              return db.query("ROLLBACK", () => {
                console.error("Error updating seat availability: ", err);
                return res
                  .status(500)
                  .json({ message: "failed to update seat availability" });
              });
            }
            db.query(
              "Insert INTO bookings (user_id, train_id, seats_booked, booking_date) VALUES (?, ?, ?, NOW())",
              [user_id, train_id, tickets],
              (err) => {
                if (err) {
                  return db.query("ROLLBACK", () => {
                    console.error("Error inserting booking: ", err);
                    return res
                      .status(500)
                      .json({ message: "Failed to create booking" });
                  });
                }
                db.query("COMMIT", (err) => {
                  if (err) {
                    return db.query("ROLLBACK", () => {
                      console.error("Error committing transaction: ", err);
                      return res.status(500).json({ message: "Commit failed" });
                    });
                  }

                  return res.status(200).json({
                    message: `${tickets} seat or seats  booked successfully`,
                  });
                });
              }
            );
          }
        );
      }
    );
  });
};

exports.getBookingDetails = (req, res) => {
  const { booking_id } = req.body;
  const user_id = req.user.id;

  if (!booking_id) {
    return res.status(400).json({ message: "Booking  id missing" });
  }

  db.query(
    "SELECT * FROM bookings WHERE id = ? AND user_id = ?",
    [booking_id, user_id],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ message: "Booking not found" });
      }
      return res.status(200).json(results[0]);
    }
  );
};
