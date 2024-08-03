import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "../services/axiosConfig";
import { GET_ALL_USERS_URL } from "../utils/Paths";
import { showLoader, hideLoader } from "../redux/reducers/authReducer";

const useUsers = () => {
  const { authenticated, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const getAllUsers = async () => {
    dispatch(showLoader());

    try {
      const response = await axios.get(GET_ALL_USERS_URL);
      setUsers(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      dispatch(hideLoader());
    }
  };

  const getUserById = async (userId) => {
    // TODO: implementation for getting user by ID
  };

  const createUser = async (userData) => {
    // TODO: implementation for creating a user
  };

  const updateUser = async (userId, updatedUserData) => {
    // TODO: implementation for updating a user
  };

  const deleteUser = async (userId) => {
    // TODO: implementation for deleting a user
  };

  useEffect(() => {
    if (authenticated && username) getAllUsers();
  }, [authenticated, username]);

  return {
    users,
    error,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUsers;
