import { Route, Routes } from 'react-router-dom';

import { CharacterDetails, CharactersList, ErrorPage } from '@/pages';
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
          <Route
            path='/404'
            element={<ErrorPage />}
          />
          <Route
            path='*'
            element={<ErrorPage />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
