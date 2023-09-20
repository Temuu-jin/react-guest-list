# README Guest List

## What

Guest List with following functions:

- Add Guest
- Delete Guest
- Attending or not

## How

API:
Installation
git clone https://github.com/upleveled/express-guest-list-api-memory-data-store.git
cd express-guest-list-api-memory-data-store
pnpm install
pnpm start

## API Usage:

### Base URL

const baseUrl = 'http://localhost:4000';

### Getting all guests (aka GET /guests)

const response = await fetch(`${baseUrl}/guests`);
const allGuests = await response.json();

### Getting a single guest (aka GET /guests/:id)

const response = await fetch(`${baseUrl}/guests/:id`);
const guest = await response.json();

### Creating a new guest (aka POST /guests)

const response = await fetch(`${baseUrl}/guests`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ firstName: 'Karl', lastName: 'Horky' }),
});
const createdGuest = await response.json();

### Updating a guest (aka PUT /guests/:id)

const response = await fetch(`${baseUrl}/guests/1`, {
method: 'PUT',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ attending: true }),
});
const updatedGuest = await response.json();

### Deleting a guest (aka DELETE /guests/:id)

const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
const deletedGuest = await response.json();

## Diary

### Consts, Objects and Attributes

Guest is a Object with following attributes:

- String First Name
- String Last Name
- Boolean Attending

Object Array guestList = [Guest{}, Guest{}, ...]

### Page Layout

Main Screen: Getting all guests
Functional Screen: Add new Guest, Delete Guest, Tick Attending/Not Attending
