import { Routes, Route } from 'react-router-dom';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { CharactersList } from '../pages/CharactersList';
import { CharacterDetails } from '../pages/CharacterDetails';

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
