import { useSelector } from 'react-redux';
import { Form, Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

function Navbar() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="flex items-center justify-between bg-yellow-400 px-4 py-4">
      <Logo />
      <div className="flex items-center justify-end gap-8">
        <SearchBar />
        <span>{userName}</span>
      </div>
    </div>
  );
}



function SearchBar(params) {
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault();
    navigate('/order/' + e.target.searchId.value)

  }
  return (
    <Form onSubmit={handleSubmit}>
      <input
      name='searchId'
        type="text"
        placeholder="search order #"
        className="w-72 rounded-full bg-yellow-50 px-2 py-1 ring-yellow-600 transition-all duration-300
      ease-out placeholder:text-slate-400 focus:w-80 focus:outline-none focus:ring-2"
      />
    </Form>
  );
}

export default Navbar;
