// import { Route, Routes } from 'react-router-dom';

import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { Input } from '../input/Input';

// import { CharacterDetails } from '../pages/CharacterDetails';
// import { CharactersList } from '../pages/CharactersList';
import './Layout.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <div className='form'>
        <Input size='default' view='filter' placeholder='Filter by name...'/>
        <Input size='default' view='form' placeholder='Rick Sanchez'/>
        {/* <Input size='small' view='filter'/> */}
        <Input size='small' view='form' placeholder='asdadsa'/>
      </div>
    
      {/* <Routes>
        <Route
          path='/'
          element={<CharactersList />}
        />
        <Route
          path='/cha'
          element={<CharacterDetails />}
        />
      </Routes> */}
      <Footer />
    </>
  );
};
