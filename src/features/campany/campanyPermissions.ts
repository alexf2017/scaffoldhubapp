import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const campanyPermissions = {
  campanyImport: {
    id: 'campanyImport',
    allowedRoles: [roles.admin],
  },

  campanyCreate: {
    id: 'campanyCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [storage.campanyLogo.id],
  },

  campanyUpdate: {
    id: 'campanyUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [storage.campanyLogo.id],
  },

  campanyRead: {
    id: 'campanyRead',
    allowedRoles: [roles.admin],
  },

  campanyAutocomplete: {
    id: 'campanyAutocomplete',
    allowedRoles: [roles.admin],
  },

  campanyDestroy: {
    id: 'campanyDestroy',
    allowedRoles: [roles.admin],
  },
};
