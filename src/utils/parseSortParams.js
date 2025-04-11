import { SORT_ORDER } from '../constants/index.js';
import { contactSortFields } from '../db/models/Contact.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  if (contactSortFields.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

export const parseSortParams = ({ sortBy, sortOrder }, contactSortFields) => {
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);
  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
