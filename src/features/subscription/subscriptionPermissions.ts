import { roles } from 'src/features/roles';

export const subscriptionPermissions = {
  subscriptionRead: {
    id: 'subscriptionRead',
    allowedRoles: [roles.admin, roles.employer],
  },
  subscriptionCreate: {
    id: 'subscriptionCreate',
    allowedRoles: [roles.admin, roles.employer],
  },
  subscriptionUpdate: {
    id: 'subscriptionUpdate',
    allowedRoles: [roles.admin, roles.employer],
  },
};
