import React from 'react'
import favoriteImg from "assets/fav.svg"
import homeImg from "assets/home.svg"
import { Link } from 'react-router';
 
const Header:React.FC = () => {
  return (
    <header className='p-4' >
      <div className='flex items-center justify-between'>
        <Link to={'/'}>
          <img width={30} src={homeImg} alt="fav" />
        </Link>
        <Link to={'/favorites'}>
          <img width={30} src={favoriteImg} alt="fav" />
        </Link>
      </div>
    </header>
  );
}

export default Header