
import { Route, Routes } from 'react-router-dom';

import { CharacterDetails, CharactersList } from '@/pages';
import { Footer, Header } from '@/shared';

import './Layout.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<CharactersList />}
        />
        <Route
          path='/cha'
          element={<CharacterDetails />}
        />
      </Routes>
      <Footer />
    </>
  );
};
