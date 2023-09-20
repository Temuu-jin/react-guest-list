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

  return (
    <div>
      <header>
        <h1 className={styles.title}>Welcome to GuestList!</h1>
      </header>
      <body>
        <div>
          <p>List of guests</p>
          <ul>
            {guests.map((guest, index) => (
              <li key={index}>
                {guest.firstName} {guest.lastName}
                <label>
                  Attending:
                  <input
                    type="radio"
                    checked={guest.attending}
                    onChange={handleInputChange}
                  />
                </label>
                <button onClick={() => deleteGuest(index)}>Delete</button>
              </li>
            ))}
          </ul>

          <p>
            Interface includes: Delete Guest from List, Radio Button
            Attending/Not Attending
          </p>
        </div>
        <div>
          <p>Interface to Add Guest</p>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={newGuest.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newGuest.lastName}
              onChange={handleInputChange}
            />
            <label>
              Attending:
              <select
                name="attending"
                value={newGuest.attending}
                onChange={handleInputChange}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
              No
            </label>
            <button onClick={addGuest}>Add Guest</button>
          </div>
        </div>
      </body>
    </div>
  );
}
