import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const workflowStepPermissions = {
  workflowStepImport: {
    id: 'workflowStepImport',
    allowedRoles: [roles.admin],
  },

  workflowStepCreate: {
    id: 'workflowStepCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  workflowStepUpdate: {
    id: 'workflowStepUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  workflowStepRead: {
    id: 'workflowStepRead',
    allowedRoles: [roles.admin],
  },

  workflowStepAutocomplete: {
    id: 'workflowStepAutocomplete',
    allowedRoles: [roles.admin, roles.employer],
  },

  workflowStepDestroy: {
    id: 'workflowStepDestroy',
    allowedRoles: [roles.admin],
  },
};
