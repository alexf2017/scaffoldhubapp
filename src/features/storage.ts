/**
 * Storage permissions.
 *
 * @id - Used to identify the rule on permissions and upload.
 * @folder - Folder where the files will be saved
 * @maxSizeInBytes - Max allowed size in bytes
 * @publicRead - The file can be publicly accessed via the URL without the need for a signed token
 */

import { membershipStorage } from 'src/features/membership/membershipStorage';
import { projetStorage } from 'src/features/projet/projetStorage';
import { livrableStorage } from 'src/features/livrable/livrableStorage';
import { workflowStorage } from 'src/features/workflow/workflowStorage';
import { stepsStorage } from 'src/features/steps/stepsStorage';
import { workflowStepStorage } from 'src/features/workflowStep/workflowStepStorage';
import { statusStorage } from 'src/features/status/statusStorage';
import { campanyStorage } from 'src/features/campany/campanyStorage';
import { commentStorage } from 'src/features/comment/commentStorage';

export interface StorageConfig {
  id: string;
  folder: string;
  maxSizeInBytes: number;
  publicRead?: boolean;
}

export const storage = {
  ...membershipStorage,
  ...projetStorage,
  ...livrableStorage,
  ...workflowStorage,
  ...stepsStorage,
  ...workflowStepStorage,
  ...statusStorage,
  ...campanyStorage,
  ...commentStorage,
};
