import ContactCollecion from '../db/models/Contact.js';

export const getContacts = () => ContactCollecion.find();

export const getContactsById = (id) => ContactCollecion.findOne({ _id: id });
