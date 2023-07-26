import { Link } from 'react-router-dom';

function Logo() {
    return (
      <Link to="/" className="!capitalize">
        Fast React Pizza
      </Link>
    );
  }

  export default Logo