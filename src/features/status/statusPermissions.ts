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
    allowedRoles: [roles.admin, roles.employer],
  },

  statusAutocomplete: {
    id: 'statusAutocomplete',
    allowedRoles: [roles.admin, roles.employer],
  },

  statusDestroy: {
    id: 'statusDestroy',
    allowedRoles: [roles.admin],
  },
};
