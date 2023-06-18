import { AddBtn, Form, FormLabel, Input } from 'components/Styles.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contactsSlice';
import { getContacts } from 'redux/selectors';
import Notiflix from 'notiflix';

export function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const number = e.target.elements.number.value;
    const normalizedName = name.toLowerCase().trim();
    if (
      contacts.find(
        contact => contact.name.toLowerCase().trim() === normalizedName
      )
    ) {
      Notiflix.Notify.warning(`${name} is already in contacts`);
      return;
    } else {
      dispatch(addContact(name, number));
      e.target.reset();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <FormLabel>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </FormLabel>
        <FormLabel>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </FormLabel>
        <AddBtn type="submit">Add contact</AddBtn>
      </Form>
    </>
  );
}
