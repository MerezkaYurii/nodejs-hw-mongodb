import ContactCollecion from '../db/models/Contact.js';

export const getContacts = async () => {
  const contacts = await ContactCollecion.find();
  return contacts;
};

export const getContactsById = async (contactId) => {
  const contact = await ContactCollecion.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactCollecion.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactCollecion.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactCollecion.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
