import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import { apiKeyApiDocs } from 'src/features/apiKey/apiKeyApiDocs';
import { auditLogApiDocs } from 'src/features/auditLog/auditLogApiDocs';
import { authApiDocs } from 'src/features/auth/authApiDocs';
import { projetApiDocs } from 'src/features/projet/projetApiDocs';
import { livrableApiDocs } from 'src/features/livrable/livrableApiDocs';
import { workflowApiDocs } from 'src/features/workflow/workflowApiDocs';
import { stepsApiDocs } from 'src/features/steps/stepsApiDocs';
import { workflowStepApiDocs } from 'src/features/workflowStep/workflowStepApiDocs';
import { statusApiDocs } from 'src/features/status/statusApiDocs';
import { campanyApiDocs } from 'src/features/campany/campanyApiDocs';
import { commentApiDocs } from 'src/features/comment/commentApiDocs';
import { fileApiDocs } from 'src/features/file/fileApiDocs';
import { membershipApiDocs } from 'src/features/membership/membershipApiDocs';
import { subscriptionApiDocs } from 'src/features/subscription/subscriptionApiDocs';
import { tenantApiDocs } from 'src/features/tenant/tenantApiDocs';

const registry = new OpenAPIRegistry();

const apiKey = registry.registerComponent('securitySchemes', 'API Key', {
  type: 'http',
  scheme: 'bearer',
});

const security = [{ [apiKey.name]: [] }];

authApiDocs(registry, security);
apiKeyApiDocs(registry, security);
auditLogApiDocs(registry, security);
projetApiDocs(registry, security);
livrableApiDocs(registry, security);
workflowApiDocs(registry, security);
stepsApiDocs(registry, security);
workflowStepApiDocs(registry, security);
statusApiDocs(registry, security);
campanyApiDocs(registry, security);
commentApiDocs(registry, security);
membershipApiDocs(registry, security);
tenantApiDocs(registry, security);
subscriptionApiDocs(registry, security);
fileApiDocs(registry, security);

export function buildApiDocs() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    info: {
      version: '1.0.0',
      title: 'API',
    },
    openapi: '3.0.0',
  });
}
