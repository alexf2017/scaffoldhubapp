import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const statusPermissions = {
  statusImport: {
    id: 'statusImport',
    allowedRoles: [roles.admin],
  },

  statusCreate: {
    id: 'statusCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  statusUpdate: {
    id: 'statusUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  statusRead: {
    id: 'statusRead',
    allowedRoles: [roles.admin],
  },

  statusAutocomplete: {
    id: 'statusAutocomplete',
    allowedRoles: [roles.admin],
  },

  statusDestroy: {
    id: 'statusDestroy',
    allowedRoles: [roles.admin],
  },
};
