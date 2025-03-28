import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const addOneContact = async () => {
  const contaktsList = await readContacts();
  const newContact = createFakeContact();
  writeContacts([...contaktsList, newContact]);
};

addOneContact();
