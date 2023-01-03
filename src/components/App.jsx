import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Box } from './Box/Box';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

export const App = () => {
  const { contactsList } = useSelector(getContacts);

  if (!contactsList) {
    return;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" pt="20px">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p="10px"
        mb="20px"
      >
        <h1>Phonebook</h1>
        <ContactForm />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" p="10px">
        <h2>Contacts</h2>
        <Filter />
        {contactsList.length > 0 && <ContactList />}
      </Box>
    </Box>
  );
};
