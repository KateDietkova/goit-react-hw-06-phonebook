import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialContacts = [{ name: 'Max', number: '0506242162' }];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addContact: {
      reducer(state, action) {
        console.log(state);
        let isName = false;
        state.forEach(({ name }) => {
          if (action.payload.name.toLowerCase() === name.toLowerCase()) {
            alert(`${action.payload.name} is already in contacts`);
            isName = true;
          }
        });
        if (!isName) {
          state.push(action.payload);
        }
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
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
