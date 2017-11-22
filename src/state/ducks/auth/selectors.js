const isLoading = state => state.auth.isLoading;
const error = state => state.auth.error;
const user = state => state.auth.user;
const isAuthenticated = state => state.auth.isAuthenticated;
const isStaff = state => state.auth.user.is_staff;

export default {
  isLoading,
  error,
  user,
  isAuthenticated,
  isStaff
};
