// @ts-ignore
const path = require('path');
// @ts-ignore
const fs = require('fs');

// @ts-ignore
const triggers = [
  'src/features/auditLog/auditLogTriggers.sql',
  'src/features/projet/projetTriggers.sql',
  'src/features/livrable/livrableTriggers.sql',
  'src/features/workflow/workflowTriggers.sql',
  'src/features/steps/stepsTriggers.sql',
  'src/features/workflowStep/workflowStepTriggers.sql',
  'src/features/status/statusTriggers.sql',
  'src/features/campany/campanyTriggers.sql',
  'src/features/comment/commentTriggers.sql',
  'src/features/apiKey/apiKeyTriggers.sql',
  'src/features/membership/membershipTriggers.sql',
  'src/features/subscription/subscriptionTriggers.sql',
  'src/features/tenant/tenantTriggers.sql',
  'src/features/user/userTriggers.sql',
]
  .map((triggerSqlPath) => {
    return fs
      .readFileSync(path.join(process.cwd(), ...triggerSqlPath.split('/')))
      .toString();
  })
  .join('\n\n');

exports.triggers = triggers;
