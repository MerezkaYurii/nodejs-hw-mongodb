import { SORT_ORDER } from '../constants/index.js';
import ContactCollecion from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = ContactCollecion.find();

  if (filter.userId) {
    contactQuery.where('userId').equals(filter.userId);
  }

  if (filter.type) {
    contactQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const contactsCount = await ContactCollecion.find()
    .merge(contactQuery)
    .countDocuments();
  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data,
    ...paginationData,
  };
};

export const getContactsById = async (contactId, userId) => {
  const contact = await ContactCollecion.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactCollecion.create(payload);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactCollecion.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  options = {},
  userId,
) => {
  const rawResult = await ContactCollecion.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { includeResultMetadata: true, ...options },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
