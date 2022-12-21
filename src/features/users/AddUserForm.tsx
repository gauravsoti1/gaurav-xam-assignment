import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addUser, selectUsers } from './usersSlice';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';

const AddUserForm = () => {
  const users = useAppSelector(selectUsers);
  const schema = yup
    .object({
      userName: yup
        .string()
        .min(5)
        .test(
          'userName',
          'Username already exists',
          (val) => users.findIndex(({ userName }) => userName === val) === -1
        )
        .required(),
      password: yup.string().required().min(8),
      branchId: yup
        .number()
        .test('branchId', 'Must be exactly 5 characters', (val) =>
          val ? val.toString().length === 5 : false
        )
        .required(),
      firstName: yup.string().min(5).required(),
      middleName: yup.string(),
      lastName: yup.string().min(5).required(),
      position: yup.string().min(5).required(),
    })
    .required();
  type AddUserFormInput = yup.InferType<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      userName: '',
      password: '',
      branchId: 0,
      firstName: '',
      middleName: '',
      lastName: '',
      position: '',
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AddUserFormInput> = (data) => {
    dispatch(addUser(data));
    reset();
  };

  const onReset = () => {
    reset();
  };
  return (
    <Container maxWidth="sm">
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldContainer>
            <Controller
              name="branchId"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  id="branchId"
                  placeholder="Enter Branch Id"
                  variant="outlined"
                  error={error !== undefined}
                  helperText={error?.message}
                  fullWidth
                  type="number"
                  {...field}
                  label="Branch Id"
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
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  id="firstName"
                  label="First Name"
                  error={error !== undefined}
                  helperText={error?.message}
                  placeholder="Enter firstName"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="middleName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  id="middleName"
                  label="Middle Name"
                  error={error !== undefined}
                  helperText={error?.message}
                  placeholder="Enter middleName"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  id="lastName"
                  label="Last Name"
                  error={error !== undefined}
                  helperText={error?.message}
                  placeholder="Enter lastName"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="position"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  id="position"
                  label="Position"
                  error={error !== undefined}
                  helperText={error?.message}
                  placeholder="Enter position"
                  variant="outlined"
                  fullWidth
                  {...field}
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
                  {...field}
                />
              )}
            />

            <ButtonsContainer>
              <Button onClick={onReset} variant="outlined">
                Reset
              </Button>
              <LoadingButton
                disabled={!isValid}
                color="primary"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Add
              </LoadingButton>
            </ButtonsContainer>
          </FormFieldContainer>
        </form>
      </FormContainer>
    </Container>
  );
};

const FormContainer = styled.div`
  padding: 16px;
  border: 1px solid grey;
  border-radius: 4px;
`;
const FormFieldContainer = styled.div`
  display: grid;
  grid-row-gap: 16px;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
`;

export default AddUserForm;
