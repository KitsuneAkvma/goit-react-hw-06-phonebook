import React from 'react';
import PropTypes from 'prop-types';

import { StyledContactsList } from './ContactsList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import { findContact } from 'redux/filterSlice';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const handleSearch = e => {
    const input = e.currentTarget;

    dispatch(findContact(input.value));
  };

  const handleRemoveContact = e => {
    e.preventDefault();
    const id = e.currentTarget.id;

    dispatch(deleteContact(id));
  };

  return (
    <StyledContactsList>
      <h2>Contacts</h2>
      {contacts.length === 0 ? null : (
        <input
          type="text"
          name="filter"
          onChange={handleSearch}
          placeholder="Search for contacts..."
        />
      )}
      <ul>
        {contacts.length === 0 ? (
          <h4>Yoy have not added any contacts yet.</h4>
        ) : (
          contacts
            .filter(contact =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(contact => {
              return (
                <li key={contact.id}>
                  <div>
                    <span>Name: </span>
                    {contact.name}
                  </div>
                  <div>
                    <span>Tel.number: </span>
                    {contact.number}
                  </div>
                  <button
                    className="removeContact"
                    onClick={handleRemoveContact}
                    id={contact.id}
                  >
                    ✖
                  </button>
                </li>
              );
            })
        )}
      </ul>
    </StyledContactsList>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  onSearch: PropTypes.func,
  onRemove: PropTypes.func,
};
