import React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import { UserType } from '../../data/usersData';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  login,
  selectIsAuthenticated,
  selectLoggedInUsername,
} from './authenticationSlice';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import { selectUsers } from '../users/usersSlice';

export const validationTextHelper = {
  userName: {
    required: 'Please enter Username',
  },
  password: {
    required: 'Please enter password',
  },
  branchId: {
    length: 'Branch Id should have 5 digits',
  },
};

const schema = yup
  .object({
    userName: yup.string().required(validationTextHelper.userName.required),
    password: yup.string().required(validationTextHelper.password.required),
    branchId: yup
      .number()
      .test('branchId', validationTextHelper.branchId.length, (val) =>
        val ? val.toString().length === 5 : false
      )
      .required(),
  })
  .required();

type LoginFormInput = yup.InferType<typeof schema>;

export default function Login() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      userName: '',
      password: '',
      branchId: 0,
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loggedInUsername = useAppSelector(selectLoggedInUsername);
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/user/${loggedInUsername}`);
    }
  }, [isAuthenticated, loggedInUsername]);

  const confirmCredentials = (data: LoginFormInput) => {
    const index = users.findIndex(
      (o: UserType) =>
        data.branchId === o.branchId &&
        data.userName === o.userName &&
        data.password === o.password
    );
    // Purposely keeping the error message verbose to make sure
    // nobody hacks
    // If the error message was userName or branch id etc doesn't exist
    // we can lose list of userName etc by process of elimination
    if (index === -1)
      setError('userName', {
        message: "Credentials don't match",
      });
    else {
      dispatch(login(users[index]));
    }
  };

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    confirmCredentials(data);
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <Controller
            name="branchId"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                id="branchId"
                label="Branch Id"
                placeholder="Enter Branch Id"
                variant="outlined"
                error={error !== undefined}
                helperText={error?.message}
                fullWidth
                type="number"
                {...field}
              />
            )}
          />
          <Controller
            name="userName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                id="userName"
                label="Username"
                error={error !== undefined}
                helperText={error?.message}
                placeholder="Enter username"
                variant="outlined"
                fullWidth
                {...field}
                autoComplete="off"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                id="password"
                label="Password"
                placeholder="Enter password"
                error={error !== undefined}
                helperText={error?.message}
                type="password"
                variant="outlined"
                fullWidth
                autoComplete="new-password"
                {...field}
              />
            )}
          />

          <Button disabled={!isValid} type="submit" variant="contained">
            Submit
          </Button>
        </FormContainer>
      </form>
    </Container>
  );
}

const FormContainer = styled.div`
  display: grid;
  grid-row-gap: 16px;
`;
