import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestUserRequest } from '../../store/actions/userActions';

export const useLoginHook = (isRegisterPage) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const signInRequestHandler = useCallback(() => {
    dispatch(requestUserRequest({ name, email, password }, isRegisterPage));
  }, [dispatch, name, email, password, isRegisterPage]);

  return { email, password, setEmail, name, setName, setPassword, signInRequestHandler };
};
