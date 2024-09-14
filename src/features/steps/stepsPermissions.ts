import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const stepsPermissions = {
  stepsImport: {
    id: 'stepsImport',
    allowedRoles: [roles.admin],
  },

  stepsCreate: {
    id: 'stepsCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  stepsUpdate: {
    id: 'stepsUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  stepsRead: {
    id: 'stepsRead',
    allowedRoles: [roles.admin],
  },

  stepsAutocomplete: {
    id: 'stepsAutocomplete',
    allowedRoles: [roles.admin, roles.employer],
  },

  stepsDestroy: {
    id: 'stepsDestroy',
    allowedRoles: [roles.admin],
  },
};
