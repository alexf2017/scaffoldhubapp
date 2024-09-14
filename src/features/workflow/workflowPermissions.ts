import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const workflowPermissions = {
  workflowImport: {
    id: 'workflowImport',
    allowedRoles: [roles.admin],
  },

  workflowCreate: {
    id: 'workflowCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  workflowUpdate: {
    id: 'workflowUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  workflowRead: {
    id: 'workflowRead',
    allowedRoles: [roles.admin],
  },

  workflowAutocomplete: {
    id: 'workflowAutocomplete',
    allowedRoles: [roles.admin, roles.employer],
  },

  workflowDestroy: {
    id: 'workflowDestroy',
    allowedRoles: [roles.admin],
  },
};
