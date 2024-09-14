import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const commentPermissions = {
  commentImport: {
    id: 'commentImport',
    allowedRoles: [roles.admin],
  },

  commentCreate: {
    id: 'commentCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  commentUpdate: {
    id: 'commentUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  commentRead: {
    id: 'commentRead',
    allowedRoles: [roles.admin],
  },

  commentAutocomplete: {
    id: 'commentAutocomplete',
    allowedRoles: [roles.admin],
  },

  commentDestroy: {
    id: 'commentDestroy',
    allowedRoles: [roles.admin],
  },
};
