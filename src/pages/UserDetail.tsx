import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import AddUserForm from "../components/users/AddUserForm";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/authenticationSlice";
import styled from "styled-components";
import { removeUser, selectUsers } from "../redux/usersSlice";

export default function UserDetail() {
  const { userName } = useParams();

  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const handleRemove = (userName: string) => () =>
    dispatch(removeUser(userName));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Header>
        <Typography variant="h6">{userName}</Typography>
        <Button onClick={handleLogout} variant="contained">
          Logout
        </Button>
      </Header>
      <AddUserForm />
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Branch Id</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.userName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="right">{user.branchId}</TableCell>
                <TableCell align="right">{user.userName}</TableCell>
                <TableCell align="right">{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell align="right">{user.position}</TableCell>
                <TableCell align="right">
                  <Button onClick={handleRemove(user.userName)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Container>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 32px 0;
`;

const StyledTableContainer = styled(TableContainer)`
  margin-top: 32px;
` as typeof TableContainer;
