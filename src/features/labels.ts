import { apiKeyLabel } from 'src/features/apiKey/apiKeyLabel';
import { projetLabel } from 'src/features/projet/projetLabel';
import { livrableLabel } from 'src/features/livrable/livrableLabel';
import { workflowLabel } from 'src/features/workflow/workflowLabel';
import { stepsLabel } from 'src/features/steps/stepsLabel';
import { workflowStepLabel } from 'src/features/workflowStep/workflowStepLabel';
import { statusLabel } from 'src/features/status/statusLabel';
import { campanyLabel } from 'src/features/campany/campanyLabel';
import { commentLabel } from 'src/features/comment/commentLabel';
import { fileLabel } from 'src/features/file/fileLabel';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { subscriptionLabel } from 'src/features/subscription/subscriptionLabel';
import { tenantLabel } from 'src/features/tenant/tenantLabel';
import { userLabel } from 'src/features/user/userLabel';

export const labels = {
  User: userLabel,
  Membership: membershipLabel,
  Tenant: tenantLabel,
  Subscription: subscriptionLabel,
  File: fileLabel,
  ApiKey: apiKeyLabel,
  Projet: projetLabel,
  Livrable: livrableLabel,
  Workflow: workflowLabel,
  Steps: stepsLabel,
  WorkflowStep: workflowStepLabel,
  Status: statusLabel,
  Campany: campanyLabel,
  Comment: commentLabel,
};
