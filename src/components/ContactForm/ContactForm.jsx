import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormStyled,
  FieldStyled,
  LabelStyled,
  ButtonStyled,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/itemsSlice/contactsSlice';
import { nanoid } from 'nanoid';
import { getContacts } from 'redux/selectors';

const initialValue = {
  name: '',
  number: '',
};

let schema = yup.object().shape({
  name: yup
    .string()
    .required('Name may contain only letters, apostrophe, dash and spaces.'),
  number: yup
    .number()
    .required(
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .positive()
    .integer(),
});

export const ContactForm = () => {
  const { contactsList } = useSelector(getContacts);
  const dispatch = useDispatch();
  const handleSubmit = (value, { resetForm }) => {
    let isName = false;
    if (contactsList && contactsList.length > 0) {
      contactsList.forEach(({ name }) => {
        if (value.name.toLowerCase() === name.toLowerCase()) {
          alert(`${value.name} is already in contacts`);
          isName = true;
        }
      });
    }

    if (!isName) {
      value.id = nanoid();
      dispatch(addContact(value));
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValue}
      validationScheme={schema}
      onSubmit={handleSubmit}
    >
      <FormStyled>
        <LabelStyled htmlFor="name">
          Name
          <FieldStyled
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </LabelStyled>
        <LabelStyled htmlFor="number">
          Number
          <FieldStyled
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </LabelStyled>
        <ButtonStyled type="submit">Add contact</ButtonStyled>
      </FormStyled>
    </Formik>
  );
};
