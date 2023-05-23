import { useState } from 'react';
import styles from './ContactForm.module.css';
import PropTypes from 'prop-types';

const initialState = {
  name: '',
  number: '',
};

function ContactForm({ onSubmit }) {
  const [state, setState] = useState({
    ...initialState,
  });

  const { name, number } = state;

  const handleSubmitForm = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({
      ...initialState,
    });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <label className={styles.labelText}>
        Name
        <input
          autoFocus
          onChange={handleInputChange}
          className={styles.input}
          value={name}
          type="text"
          name="name"
          placeholder="Enter contact name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adriafn, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={styles.labelText}>
        Number
        <input
          onChange={handleInputChange}
          className={styles.input}
          value={number}
          type="tel"
          name="number"
          placeholder="Enter contact number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={styles.submitButton}>
        Add Contact
      </button>
    </form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
