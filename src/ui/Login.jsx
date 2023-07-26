import { Form, useNavigate } from 'react-router-dom';
import Button from './form/Button';
import { setName } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import InputContainer from './form/InputContainer';
import FormError from './form/Error';

function Login() {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function formHandler(e) {
    e.preventDefault();
    if (!userName) {
      setError('Please enter a valid name');
      return;
    }
    dispatch(setName(userName));
    navigate('/menu');
  }

  return (
    <form onSubmit={formHandler} className="flex w-full flex-col items-center gap-y-5">
      <div className='flex flex-col gap-3 items-center'>
      
        <input
          onChange={(e) => setUserName(e.target.value)}
          name="name"
          type="text"
          placeholder="Your full name"
          className="w-72 col-span-2 rounded-full border border-slate-400 bg-white px-3 py-3 
          ring-yellow-500 transition-all duration-500 
          placeholder:text-slate-400 focus:w-80 focus:outline-none focus:ring-2"
          />
          <FormError>{error}</FormError>
          </div>
      <Button className='!self-center'>Let's get some pizza</Button>
    </form>
  );
}

export default Login;
