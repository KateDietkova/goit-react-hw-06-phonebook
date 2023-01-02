import { ContactItem } from "components/ContactItem/ContactItem";
import { useSelector } from "react-redux";
import { ContactListStyled, ContactListItemStyled } from "./ContactList.styled";
import { getContacts, getFilterValue } from "redux/selectors";

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
    return filterContacts;
  };
  return (
    <ContactListStyled>
      {visibleContacts.map(contact => (
        <ContactListItemStyled key={contact.id}>
          <ContactItem contact={contact} />
        </ContactListItemStyled>
      ))}
    </ContactListStyled>
  );
};


