
### How to start the project
`yarn install && yarn start`

### Run tests using the following command
`yarn test`

Important Notes:
1. LocalStorage is being used to store users data, mimicks a database on the backend, hence password is stored in local storage. Otherwise it must not be, it's a huge security risk.
2. Session storage is used to store user authentication status
3. Once a new user is added, you are able to login using that user
4. Redux-persist is used to persist data in local and session storage
5. AddUser form in user detail page
   1. username should be unique
   2. branchId, username should be at least 5 characters long
   3. Every field except for 'middle name' is required
6. Eslint is configured
7. MUi Library is used for components
8. Styled-components is used to write CSS in JS
9. redux-toolkit is used, this helps make sure that the state update won't be mutable
10. jest, reacting-testing-library is being used for tests
