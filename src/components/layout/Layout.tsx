// import { Route, Routes } from 'react-router-dom';

import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '../options/Options';
import { Select } from '../selector/Select';
import { StatusOption } from '../statusOption/StatusOption';

// import { CharacterDetails } from '../pages/CharacterDetails';
// import { CharactersList } from '../pages/CharactersList';
import './Layout.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <Select 
        size='small'
        placeholder='Gender'
        options={GENDER_OPTIONS}
        />
        <Select 
        size='default'
        // placeholder='Gender'
        defaultValue='Alive'
        options={STATUS_OPTIONS}
        SelectOptionComponent={StatusOption}
        />
        <Select 
          size='small'
          options={STATUS_OPTIONS}
          defaultValue='Dead'
          SelectOptionComponent={StatusOption}/>
        <Select 
          size='small'
          placeholder='Species'
          // defaultValue='Human'
          options={SPECIES_OPTIONS}/>
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
