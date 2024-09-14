import { roles } from 'src/features/roles';

export const apiKeyPermissions = {
  apiKeyCreate: {
    id: 'apiKeyCreate',
    allowedRoles: [roles.admin, roles.employer],
  },

  apiKeyUpdate: {
    id: 'apiKeyUpdate',
    allowedRoles: [roles.admin, roles.employer],
  },

  apiKeyRead: {
    id: 'apiKeyRead',
    allowedRoles: [roles.admin, roles.employer],
  },

  apiKeyDestroy: {
    id: 'apiKeyDestroy',
    allowedRoles: [roles.admin, roles.employer],
  },

  // Can be used to update all API keys, even if they belong to other members in the tenant
  apiKeyUpdateAllMembers: {
    id: 'apiKeyUpdateAllMembers',
    allowedRoles: [roles.admin],
  },

  // Can be used to destroy all API keys, even if they belong to other members in the tenant
  apiKeyDestroyAllMembers: {
    id: 'apiKeyDestroyAllMembers',
    allowedRoles: [roles.admin],
  },

  // Can be used to read all API keys, even if they belong to other members in the tenant
  apiKeyReadAllMembers: {
    id: 'apiKeyRead',
    allowedRoles: [roles.admin],
  },
};
