// import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// import Rick from '@/assets/images/rick.jpg';
import { CharacterDetails, CharactersList } from '@/pages';
// import type { TStatus } from '@/shared';
import { Footer, Header } from '@/shared';

// import { CharactersCard } from '@/widgets';
// import { type ICharacterFilters, PanelFilters } from '@/widgets';
import './Layout.css';

export const Layout = () => {
  // const persons = [
  //   {
  //     name: 'Rick Sanchez',
  //     status: 'Alive' as TStatus,
  //     species: 'Human',
  //     gender: 'Male',
  //     location: 'asdasda',
  //     image: Rick,
  //   },
  //   {
  //     name: 'Rick Sanchez',
  //     status: 'Alive' as TStatus,
  //     species: 'Human',
  //     gender: 'Male',
  //     location: 'asdasda',
  //     image: Rick,
  //   },
  // ];

  // const [filters, setFilters] = useState<ICharacterFilters>({
  //   name: '',
  //   species: '',
  //   status: '',
  //   gender: '',
  // });

  return (
    <>
      <Header />
      {/* <div className='container'>
        <PanelFilters
          filters={filters}
          onChangeFilters={setFilters}
        />

        {persons.map((per, index) => (
          <CharactersCard
            key={index}
            name={per.name}
            gender={per.gender}
            image={per.image}
            location={per.location}
            species={per.species}
            status={per.status}
          />
        ))}
      </div> */}
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
