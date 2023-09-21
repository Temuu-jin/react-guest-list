import { useState } from 'react';
import styles from './App.module.scss';

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    attending: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewGuest({ ...newGuest, [name]: value });
  };

  const addGuest = () => {
    setGuests([...guests, newGuest]);
    setNewGuest({ firstName: '', lastName: '', attending: false });
  };

  const deleteGuest = (index) => {
    const updatedGuests = [...guests];
    updatedGuests.splice(index, 1);
    setGuests(updatedGuests);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addGuest();
  };

  const toggleAttendingStatus = (index) => {
    const updatedGuests = [...guests]; // copy guestsArray
    updatedGuests[index].attending = !updatedGuests[index].attending; // toggle guests[index]
    setGuests(updatedGuests); // save the updated guestsArray to state
  };

  return (
    <>
      {' '}
      <header>
        <h1 className={styles.title}>Welcome to GuestList!</h1>
      </header>
      <body>
        <div className={styles.listContainer}>
          <h2>List of guests</h2>
          <br />
          <br />

          {guests.length > 0 ? (
            <ul style={{ listStyle: 'none' }}>
              {guests.map((guest, index) => (
                <li key={index} style={{ textTransform: 'capitalize' }}>
                  {guest.firstName} {guest.lastName} Attending:{' '}
                  {guest.attending ? 'Yes' : 'No'}{' '}
                  <button onClick={() => toggleAttendingStatus(index)}>
                    Attending/Not Attending
                  </button>{' '}
                  <button onClick={() => deleteGuest(index)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No guests</p>
          )}
        </div>
        <br />
        <br />

        <div>
          <p>Add Guest</p>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:{' '}
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newGuest.firstName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />

            <label>
              Last Name:{' '}
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newGuest.lastName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />

            <label>
              Attending:{' '}
              <select
                name="attending"
                value={newGuest.attending}
                onChange={handleInputChange}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </label>
            <br />
            <br />

            <button type="submit">Add Guest</button>
          </form>
        </div>
      </body>
    </>
  );
}
