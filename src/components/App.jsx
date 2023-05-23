import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

function App() {
  const [contacts, setContact] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = ({ name, number }) => {
    if (checkContactExist(name)) {
      Notify.failure(`${name} is already in your contacts`);
      return;
    }
    setContact(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = id => {
    setContact(prevContacts => {
      return prevContacts.filter(contact => contact.id !== id);
    });
  };

  const checkContactExist = name => {
    const normalizadName = name.toLowerCase().trim();
    const foundContact = contacts.find(
      ({ name }) => name.toLowerCase().trim() === normalizadName
    );
    return Boolean(foundContact);
  };

  const filterInput = ({ target }) => setFilter(target.value);

  const filterContactList = () => {
    return contacts.filter(({ name }) => {
      return name.toLowerCase().trim().includes(filter.toLowerCase().trim());
    });
  };

  const filteredContacts = filterContactList();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>
        <div style={{ marginBottom: '30px', width: '350px' }}>
          <h2 style={{ marginBottom: '10px', fontSize: '40px' }}>PhoneBook</h2>
          <ContactForm onSubmit={addNewContact} />
        </div>
        <div>
          <h3 style={{ marginBottom: '10px', fontSize: '30px' }}>Contacts</h3>
          <Filter filter={filter} filterInput={filterInput} />
          {isContacts ? (
            <ContactList contacts={filteredContacts} onClick={deleteContact} />
          ) : (
            <p style={{ fontSize: 18, color: '#010101' }}>
              There are no contacts in your phonebook
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
