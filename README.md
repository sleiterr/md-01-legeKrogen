## Backend Endpoints Overview (CRUD for Users)

loginUser: Allows implementing a login form, for example, for an admin panel or any protected section. 
The frontend sends the email and password, and receives a token that can be used for authorizing subsequent requests.

createUser: Allows creating a new user. For example, in an admin panel, 
you can provide a registration form for a new account, including fields like name, email, password, and role.

updateUser: Allows editing user data. On the frontend, you can implement an edit form 
(e.g., to change name, role, or picture) and update the user in the database using this method.

deleteUser: Allows deleting a user by their \_id. 
On the frontend, this can be implemented as a "Delete" button next to each user in a table.

getUserById: Allows searching for a specific user by their ID. On the frontend, 
you can implement a search input field where a user enters the ID, and the corresponding user data is displayed.

getUsers: Allows retrieving a list of all users. 
This can be used, for example, to display a table in an admin panel showing all users from the database.
