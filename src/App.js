import { useEffect, useState } from 'react';
import styles from './App.module.scss';

const baseUrl = 'http://localhost:4000';

export default function GuestList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    attending: false,
  });

  useEffect(() => {
    // fetch all guests
    async function fetchGuests() {
      try {
        const response = await fetch(`${baseUrl}/guests`);
        const fetchData = await response.json();
        setGuests(fetchData);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGuests().catch(console.error);
  }, []);

  // add a guest
  // add newGuest to ...guests and POST to API
  const addGuest = async () => {
    try {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: newGuest.firstName,
          lastName: newGuest.lastName,
          attending: newGuest.attending ? 'true' : 'false',
        }),
      });
      if (!response.ok) {
        console.error('Request failed with status:', response.status);
        // Handle the error condition here if needed
        return;
      }
      const data = await response.json();
      setGuests([...guests, data]);
      setNewGuest({ firstName: '', lastName: '', attending: false }); // Reset to false for the next guest
    } catch (error) {
      console.error(error);
    }
  };

  // delete a guest
  const deleteGuest = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Filter out the deleted guest from the state
        const updatedGuests = guests.filter((guest) => guest.id !== id);
        setGuests(updatedGuests);
      } else {
        console.error('Failed to delete guest:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  // toggle attending status
  const handleCheckboxChange = (guest) => async (event) => {
    const isChecked = event.target.checked;
    setGuests((prevGuests) =>
      prevGuests.map((prevGuest) =>
        prevGuest.id === guest.id
          ? { ...prevGuest, attending: isChecked }
          : prevGuest,
      ),
    );

    try {
      const response = await fetch(`${baseUrl}/guests/${guest.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: isChecked }),
      });

      if (!response.ok) {
        console.error('Failed to update guest:', response.statusText);

        // If the request failed, revert change in UI by flipping isChecked
        setGuests((prevGuests) =>
          prevGuests.map((prevGuest) =>
            prevGuest.id === guest.id
              ? { ...prevGuest, attending: !isChecked }
              : prevGuest,
          ),
        );
      }
    } catch (error) {
      console.error('Error on checkbox change:', error);
    }
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    addGuest().catch(console.error);
  };

  // handle input change
  const handleInputChange = (event) => {
    const { name } = event.target;
    const value = event.target.value;

    setNewGuest({ ...newGuest, [name]: value });
  };
  /* export default function GuestList() {
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
    setNewGuest({ firstName: '', lastName: '', attending: null });
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
 */
  return isLoaded ? (
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
              {guests.map((guest) => (
                <li key={`guest-${guest.id}`} className={styles.listItem}>
                  {guest.firstName} {guest.lastName} Attending Status:{' '}
                  <input
                    aria-label="attending"
                    type="checkbox"
                    name="attending"
                    checked={guest.attending}
                    onChange={handleCheckboxChange(guest)}
                  />{' '}
                  <button
                    onClick={() => deleteGuest(guest.id)}
                    aria-label="Remove"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No guests</p>
          )}
        </div>

        <br />
        <br />
        <div className={styles.addGuestContainer} data-test-id="guest">
          <p>Add Guest</p>
          <form onSubmit={handleSubmit} disabled={!isLoaded}>
            <label>
              First name
              <input
                name="firstName"
                required={true}
                value={newGuest.firstName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />

            <label>
              Last name
              <input
                name="lastName"
                required={true}
                value={newGuest.lastName}
                onChange={handleInputChange}
              />
            </label>

            <br />
            <br />

            <button>Add Guest</button>
          </form>
        </div>
      </body>
    </>
  ) : (
    <p>Loading...</p>
  );
}
