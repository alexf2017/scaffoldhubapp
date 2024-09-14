-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('active', 'disabled', 'invited');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused');

-- CreateEnum
CREATE TYPE "SubscriptionMode" AS ENUM ('user', 'tenant', 'membership', 'disabled');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifyEmailToken" TEXT,
    "verifyEmailTokenExpiresAt" TIMESTAMPTZ(3),
    "provider" TEXT,
    "providerId" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetTokenExpiresAt" TIMESTAMPTZ(3),
    "expireSessionsOlderThan" TIMESTAMPTZ(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entityName" TEXT NOT NULL,
    "entityId" UUID NOT NULL,
    "tenantId" UUID,
    "userId" UUID,
    "membershipId" UUID,
    "apiKeyId" UUID,
    "apiEndpoint" TEXT,
    "apiHttpResponseCode" TEXT,
    "operation" TEXT NOT NULL,
    "oldData" JSONB,
    "newData" JSONB,
    "transactionId" BIGINT NOT NULL DEFAULT txid_current(),

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "name" TEXT NOT NULL,
    "keyPrefix" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "scopes" TEXT[],
    "expiresAt" TIMESTAMPTZ(3),
    "disabledAt" TIMESTAMPTZ(3),
    "membershipId" UUID NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "userId" UUID NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "fullName" TEXT,
    "avatars" JSONB,
    "roles" TEXT[],
    "invitationToken" TEXT,
    "status" "MembershipStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "membershipId" UUID,
    "userId" UUID NOT NULL,
    "mode" "SubscriptionMode" NOT NULL,
    "isCancelAtEndPeriod" BOOLEAN NOT NULL DEFAULT false,
    "stripeCustomerId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "stripePriceId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "title" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Projet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livrable" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "title" TEXT NOT NULL,
    "document" JSONB,
    "projetId" UUID,
    "statusnameId" UUID NOT NULL,

    CONSTRAINT "Livrable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workflow" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "title" TEXT NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Steps" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "title" TEXT NOT NULL,

    CONSTRAINT "Steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowStep" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "order" INTEGER NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "steptitleId" UUID,
    "workFlowId" UUID,
    "observerId" UUID,
    "responsibleId" UUID,
    "livrableId" UUID,

    CONSTRAINT "WorkflowStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campany" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "name" TEXT,
    "logo" JSONB,
    "urlSiteOfficiel" TEXT,
    "adresse" TEXT,
    "government" TEXT,

    CONSTRAINT "Campany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "context" TEXT,
    "workflowstepidId" UUID,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_steps_workflow" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_secret_key" ON "ApiKey"("secret");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_id_tenantId_key" ON "ApiKey"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_id_tenantId_membershipId_key" ON "ApiKey"("id", "tenantId", "membershipId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_importHash_key" ON "Membership"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_invitationToken_key" ON "Membership"("invitationToken");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_id_tenantId_key" ON "Membership"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_tenantId_key" ON "Membership"("userId", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Projet_importHash_key" ON "Projet"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Projet_id_tenantId_key" ON "Projet"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Livrable_importHash_key" ON "Livrable"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Livrable_id_tenantId_key" ON "Livrable"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_importHash_key" ON "Workflow"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_id_tenantId_key" ON "Workflow"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Steps_importHash_key" ON "Steps"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Steps_id_tenantId_key" ON "Steps"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowStep_importHash_key" ON "WorkflowStep"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowStep_id_tenantId_key" ON "WorkflowStep"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Status_importHash_key" ON "Status"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Status_id_tenantId_key" ON "Status"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Campany_importHash_key" ON "Campany"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Campany_id_tenantId_key" ON "Campany"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_importHash_key" ON "Comment"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_tenantId_key" ON "Comment"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "_steps_workflow_AB_unique" ON "_steps_workflow"("A", "B");

-- CreateIndex
CREATE INDEX "_steps_workflow_B_index" ON "_steps_workflow"("B");

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projet" ADD CONSTRAINT "Projet_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projet" ADD CONSTRAINT "Projet_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projet" ADD CONSTRAINT "Projet_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livrable" ADD CONSTRAINT "Livrable_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livrable" ADD CONSTRAINT "Livrable_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livrable" ADD CONSTRAINT "Livrable_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livrable" ADD CONSTRAINT "Livrable_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livrable" ADD CONSTRAINT "Livrable_statusnameId_fkey" FOREIGN KEY ("statusnameId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Steps" ADD CONSTRAINT "Steps_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Steps" ADD CONSTRAINT "Steps_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Steps" ADD CONSTRAINT "Steps_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_steptitleId_fkey" FOREIGN KEY ("steptitleId") REFERENCES "Steps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_workFlowId_fkey" FOREIGN KEY ("workFlowId") REFERENCES "Workflow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_observerId_fkey" FOREIGN KEY ("observerId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_livrableId_fkey" FOREIGN KEY ("livrableId") REFERENCES "Livrable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campany" ADD CONSTRAINT "Campany_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campany" ADD CONSTRAINT "Campany_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campany" ADD CONSTRAINT "Campany_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_workflowstepidId_fkey" FOREIGN KEY ("workflowstepidId") REFERENCES "WorkflowStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_steps_workflow" ADD CONSTRAINT "_steps_workflow_A_fkey" FOREIGN KEY ("A") REFERENCES "Steps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_steps_workflow" ADD CONSTRAINT "_steps_workflow_B_fkey" FOREIGN KEY ("B") REFERENCES "Workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
