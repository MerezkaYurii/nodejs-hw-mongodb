import { typeList } from '../constants/contacts.js';

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;
  const parsedType = typeList.includes(type) ? type : undefined;
  const parsedisFavourite = isFavourite ? isFavourite : undefined;
  return {
    type: parsedType,
    isFavourite: parsedisFavourite,
  };
};
