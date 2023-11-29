import {useAppSelector} from './../store';

export const useUser = () => {
  const user = useAppSelector(state => state.auth.user);
  return user;
};

export const useIsAuthenticated = () => {
  return useAppSelector(state => state.auth.isAuthenticated);
};

export default useUser;
