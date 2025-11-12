import { Route, Routes } from 'react-router-dom';

import { CharacterDetails, CharactersList } from '@/pages';
import { Footer, Header } from '@/shared';

import './Layout.css';

export const Layout = () => {
  return (
    <div className='layout'>
      <Header />
      <div className='layout__content'>
        <Routes>
          <Route
            path='/'
            element={<CharactersList />}
          />
          <Route
            path='/character/:id'
            element={<CharacterDetails />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
