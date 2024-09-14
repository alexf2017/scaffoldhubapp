import { uniqBy } from 'lodash';
import { apiKeyPermissions } from 'src/features/apiKey/apiKeyPermissions';
import { auditLogPermissions } from 'src/features/auditLog/auditLogPermissions';
import { projetPermissions } from 'src/features/projet/projetPermissions';
import { livrablePermissions } from 'src/features/livrable/livrablePermissions';
import { workflowPermissions } from 'src/features/workflow/workflowPermissions';
import { stepsPermissions } from 'src/features/steps/stepsPermissions';
import { workflowStepPermissions } from 'src/features/workflowStep/workflowStepPermissions';
import { statusPermissions } from 'src/features/status/statusPermissions';
import { campanyPermissions } from 'src/features/campany/campanyPermissions';
import { commentPermissions } from 'src/features/comment/commentPermissions';
import { membershipPermissions } from 'src/features/membership/membershipPermissions';
import { subscriptionPermissions } from 'src/features/subscription/subscriptionPermissions';
import { tenantPermissions } from 'src/features/tenant/tenantPermissions';

export interface Permission {
  id: string;
  allowedRoles: Array<string>;
  allowedStorage?: Array<string>;
}

export const permissions = {
  ...auditLogPermissions,
  ...apiKeyPermissions,
  ...membershipPermissions,
  ...subscriptionPermissions,
  ...tenantPermissions,
  ...projetPermissions,
  ...livrablePermissions,
  ...workflowPermissions,
  ...stepsPermissions,
  ...workflowStepPermissions,
  ...statusPermissions,
  ...campanyPermissions,
  ...commentPermissions,
} as const;

export function availablePermissions(roles: Array<string>) {
  return uniqBy(
    Object.values(permissions).filter((permission) => {
      return permission.allowedRoles.some((role) => roles.includes(role));
    }),
    'id',
  );
}
