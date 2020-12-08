export const isAuthenticated = () => {
  const data = JSON.parse(window.localStorage.getItem('data'));
  if(!data) {
    return false;
  }
  if(!data.token) {
    return false;
  }
  return true;
};

export const signIn = (email, password) => {

  return true;
};