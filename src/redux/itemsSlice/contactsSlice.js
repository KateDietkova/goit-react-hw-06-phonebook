import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contactsList: [] },
  reducers: {
    addContact(state, action) {
      return { contactsList: [...state.contactsList, action.payload] };
    },
    deleteContact(state, action) {
      return {
        contactsList: state.contactsList.filter(contact => contact.id !== action.payload),
      };
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
  blackList: ['filter'],
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;
