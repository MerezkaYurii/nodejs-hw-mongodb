import { Router } from 'express';
import {
  createContactController,
  getContactsByIdController,
  getContactsController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactsByIdController));

contactsRouter.post('/', ctrlWrapper(createContactController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

contactsRouter.put('/:contactId', ctrlWrapper(upsertContactController));

contactsRouter.patch('/:contactId', ctrlWrapper(patchContactController));

export default contactsRouter;
