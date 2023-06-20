import PropTypes from 'prop-types';
import { BiTrash, BiPhoneCall } from 'react-icons/bi';
import {
  ContactItem,
  ContactWrapper,
  DeleteBtn,
  Name,
  PhoneWrapper,
} from 'components/Styles.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContactsThunk,
  getContactsThunk,
} from 'redux/contacts/contactsThunk';
import { selectIsLoading } from 'redux/selectors';

export const ListItem = ({ contact }) => {
  const { id, name, number } = contact;

  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteContactsThunk(id));
    await dispatch(getContactsThunk());
  };

  return (
    <ContactItem>
      <Name>{name}</Name>
      <ContactWrapper>
        <PhoneWrapper href={`tel:${number}`}>
          <BiPhoneCall color="rgba(66, 137, 254, 255)" />
          {number}
        </PhoneWrapper>
        <div>
          <DeleteBtn
            type="button"
            name="delete"
            value={id}
            onClick={handleDelete}
            disabled={isLoading}
          >
            <BiTrash size="20px" />
          </DeleteBtn>
        </div>
      </ContactWrapper>
    </ContactItem>
  );
};

ListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
