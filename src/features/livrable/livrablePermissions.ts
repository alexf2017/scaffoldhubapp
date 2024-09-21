import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const livrablePermissions = {
  livrableImport: {
    id: 'livrableImport',
    allowedRoles: [roles.admin],
  },

  livrableCreate: {
    id: 'livrableCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [storage.livrableDocument.id],
  },

  livrableUpdate: {
    id: 'livrableUpdate',
    allowedRoles: [roles.admin, roles.employer],
    allowedStorage: [storage.livrableDocument.id],
  },

  livrableRead: {
    id: 'livrableRead',
    allowedRoles: [roles.admin, roles.employer],
  },

  livrableAutocomplete: {
    id: 'livrableAutocomplete',
    allowedRoles: [roles.admin, roles.employer],
  },

  livrableDestroy: {
    id: 'livrableDestroy',
    allowedRoles: [roles.admin],
  },
};
