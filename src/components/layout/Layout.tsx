// import { Route,Routes } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
// import { CharacterDetails } from '../pages/CharacterDetails';
// import { CharactersList } from '../pages/CharactersList';
import {
  // GENDER_OPTIONS,
  // SPECIES_OPTIONS,
  STATUS_OPTIONS,
} from '../options/Options';
import { Select } from '../selector/Select';

import './Layout.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <div className='selectors'>
        {/* <Select
          options={GENDER_OPTIONS}
          placeholder='Gender'
          size='default'
        />
        <Select
          options={SPECIES_OPTIONS}
          placeholder='Species'
          size='default'
        />
        <Select
          options={STATUS_OPTIONS}
          placeholder='Status'
          size='default'
          withStatus
        /> */}
        <Select
          options={STATUS_OPTIONS}
          size='small'
          placeholder='Status'
          withStatus
        />
        <Select
          options={STATUS_OPTIONS}
          size='small'
          value='alive'
          withStatus
        />
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
