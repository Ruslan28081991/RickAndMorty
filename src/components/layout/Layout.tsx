import { Route,Routes } from 'react-router-dom';

import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { CharacterDetails } from '../pages/CharacterDetails';
import { CharactersList } from '../pages/CharactersList';

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
