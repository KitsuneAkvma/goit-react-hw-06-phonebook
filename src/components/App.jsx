import React, { useEffect } from 'react';

import GlobalStyle from '../themes/GlobalStyles.styled';
import { Container } from './Container/Container.styled';
import { ContactCreationForm } from './ContactCreationForm/ContactCreationForm';
import { ContactsList } from './ContactsList/ContactsList';
import { useSelector } from 'react-redux';

import { getContacts } from 'redux/selectors';

export const App = () => {
  const contacts = useSelector(getContacts);
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <ContactCreationForm />
        <ContactsList />
      </Container>
    </>
  );
};

export default App;
