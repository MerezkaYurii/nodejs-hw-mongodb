import ContactCollecion from '../db/models/Contact.js';

export const getContacts = async () => {
  const contacts = await ContactCollecion.find();
  return contacts;
};

export const getContactsById = async (contactId) => {
  const contact = await ContactCollecion.findById(contactId);
  return contact;
};
