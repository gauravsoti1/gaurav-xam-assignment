import React from "react";
// import { screen, fireEvent, waitFor } from '@testing-library/react';
// import Login, { validationTextHelper } from '../components/authentication/Login';
// import { renderWithProviders } from '../utils/test-utils';
// import { users } from '../data/usersData';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...(jest.requireActual('react-router-dom') as any),
//   useNavigate: () => mockedUsedNavigate,
// }));

// describe('Login', () => {
//   beforeEach(() => {
//     renderWithProviders(<Login />);
//   });
//   it('should display error when branchId is not equal to 5 characters', async () => {
//     fireEvent.input(screen.getByRole('spinbutton', { name: 'Branch Id' }), {
//       target: {
//         value: 1000,
//       },
//     });

//     const alertMessage = await screen.findByText(
//       validationTextHelper.branchId.length
//     );
//     expect(alertMessage).toBeInTheDocument();
//   });

//   it('should display error when username is empty', async () => {
//     fireEvent.input(screen.getByRole('textbox', { name: 'Username' }), {
//       target: {
//         value: '',
//       },
//     });
//     fireEvent.submit(screen.getByRole('button'));

//     const alertMessage = await screen.findByText(
//       validationTextHelper.userName.required
//     );
//     expect(alertMessage).toBeInTheDocument();
//   });

//   it('should display error when password is empty', async () => {
//     fireEvent.input(screen.getByLabelText('Password'), {
//       target: {
//         value: '',
//       },
//     });
//     fireEvent.submit(screen.getByRole('button'));
//     const alertMessage = await screen.findByText(
//       validationTextHelper.password.required
//     );
//     expect(alertMessage).toBeInTheDocument();
//   });

//   it('should have correct labels', () => {
//     const branchIdLabel = screen.getByLabelText('Branch Id');
//     const usernameLabel = screen.getByLabelText('Username');
//     const passwordLabel = screen.getByLabelText('Password');

//     expect(branchIdLabel).toBeVisible();
//     expect(usernameLabel).toBeVisible();
//     expect(passwordLabel).toBeVisible();
//   });

//   it('login functionality works', async () => {
//     fireEvent.input(screen.getByRole('spinbutton', { name: 'Branch Id' }), {
//       target: {
//         value: users[0].branchId,
//       },
//     });
//     fireEvent.input(screen.getByRole('textbox', { name: 'Username' }), {
//       target: {
//         value: users[0].userName,
//       },
//     });
//     fireEvent.input(screen.getByLabelText('Password'), {
//       target: {
//         value: users[0].password,
//       },
//     });
//     await fireEvent.submit(screen.getByRole('button'));
//     waitFor(() =>
//       expect(screen.getByRole('heading', { name: users[0].userName }))
//     );
//   });
// });
