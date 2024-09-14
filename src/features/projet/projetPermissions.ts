import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const projetPermissions = {
  projetImport: {
    id: 'projetImport',
    allowedRoles: [roles.admin],
  },

  projetCreate: {
    id: 'projetCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  projetUpdate: {
    id: 'projetUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  projetRead: {
    id: 'projetRead',
    allowedRoles: [roles.admin],
  },

  projetAutocomplete: {
    id: 'projetAutocomplete',
    allowedRoles: [roles.admin, roles.employer],
  },

  projetDestroy: {
    id: 'projetDestroy',
    allowedRoles: [roles.admin],
  },
};
