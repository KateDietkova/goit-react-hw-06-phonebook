import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/itemsSlice/contactsSlice';
import { ButtonContactStyled, ContactInfo } from './ContactItem.styled';

export const ContactItem = ({
  contact: { id, name, number }
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <ContactInfo>
        {name}: {number}
      </ContactInfo>
      <ButtonContactStyled
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </ButtonContactStyled>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
