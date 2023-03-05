import React from 'react';

import GlobalStyle from '../themes/GlobalStyles.styled';
import { Container } from './Container/Container.styled';
import { ContactCreationForm } from './ContactCreationForm/ContactCreationForm';
import { ContactsList } from './ContactsList/ContactsList';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { findContact } from 'redux/filterSlice';
import { getContacts, getFilter } from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    if (
      contacts.filter(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      ).length >= 1
    ) {
      return alert(`Contact "${name}" is already on the list`);
    }

    dispatch(addContact(name, number));

    localStorage.setItem('contacts', JSON.stringify(contacts));

    form.reset();
  };

  //--- Event Handlers ---//

  const handleSearch = e => {
    const input = e.currentTarget;

    dispatch(findContact(input.value));
    console.log(`Searching... ${filter}`);
  };

  const handleRemoveContact = e => {
    e.preventDefault();
    const id = e.currentTarget.id;

    dispatch(deleteContact(id));
    console.log(id);

    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <ContactCreationForm onSubmit={handleSubmit} />
        <ContactsList
          contacts={contacts}
          filter={filter}
          onSearch={handleSearch}
          onRemove={handleRemoveContact}
        />
      </Container>
    </>
  );
};

export default App;
