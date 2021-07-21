import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestUserRequest } from '../../store/actions/userActions';

export const useLoginHook = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const signInRequestHandler = useCallback(() => {
    dispatch(requestUserRequest(email, password));
  }, [dispatch, email, password]);

  return { email, password, setEmail, setPassword, signInRequestHandler };
};
