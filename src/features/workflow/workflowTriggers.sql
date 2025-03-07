-- Enable Row Level Security
ALTER TABLE "Workflow" ENABLE ROW LEVEL SECURITY;

-- Force Row Level Security for table owners
ALTER TABLE "Workflow" FORCE ROW LEVEL SECURITY;

-- Create row security policies
DO
  $do$
  BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_policies WHERE  policyname = 'tenant_isolation_policy' AND tablename = 'Workflow' and schemaname = current_schema()
    ) THEN
      CREATE POLICY tenant_isolation_policy ON "Workflow" USING ("tenantId"::text = current_setting('app.current_tenant_id', TRUE));
    END IF;
  END
  $do$;

-- Create policies to bypass RLS
DO
  $do$
  BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_policies WHERE policyname = 'bypass_rls_policy'  AND tablename = 'Workflow' and schemaname = current_schema()
    ) THEN
      CREATE POLICY bypass_rls_policy ON "Workflow" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
    END IF;
  END
  $do$;

CREATE OR REPLACE FUNCTION workflow_log() RETURNS trigger AS $body$
DECLARE
    current_user_id uuid;
    current_membership_id uuid;
    current_tenant_id uuid;
    current_api_key_id uuid;
BEGIN
    if (current_setting('app.current_user_id', 't') != '') then
        current_user_id := (current_setting('app.current_user_id', 't')::uuid);
    end if;

    if (current_setting('app.current_membership_id', 't') != '') then
        current_membership_id := (current_setting('app.current_membership_id', 't')::uuid);
    end if;

    if (current_setting('app.current_tenant_id', 't') != '') then
        current_tenant_id := (current_setting('app.current_tenant_id', 't')::uuid);
    end if;

    if (current_setting('app.current_api_key_id', 't') != '') then
        current_api_key_id := (current_setting('app.current_api_key_id', 't')::uuid);
    end if;

    if (TG_OP = 'UPDATE') then
        INSERT INTO "AuditLog" ( id, "entityName", "entityId", "userId", "membershipId", "tenantId", "apiKeyId", operation, "oldData", "newData", "transactionId" ) values ( gen_random_uuid(), 'Workflow', OLD.id, current_user_id, current_membership_id, current_tenant_id, current_api_key_id, 'U', to_jsonb(OLD), to_jsonb(NEW), txid_current() );
        RETURN NEW;
    elsif (TG_OP = 'DELETE') then
        INSERT INTO "AuditLog" ( id, "entityName", "entityId", "userId", "membershipId", "tenantId", "apiKeyId", operation, "oldData", "newData", "transactionId" ) values ( gen_random_uuid(), 'Workflow', OLD.id, current_user_id, current_membership_id, current_tenant_id, current_api_key_id, 'D', to_jsonb(OLD), null, txid_current() );
        RETURN OLD;
    elsif (TG_OP = 'INSERT') then
        INSERT INTO "AuditLog" ( id, "entityName", "entityId", "userId", "membershipId", "tenantId", "apiKeyId", operation, "oldData", "newData", "transactionId" ) values ( gen_random_uuid(), 'Workflow', NEW.id, current_user_id, current_membership_id, current_tenant_id, current_api_key_id, 'C', null, to_jsonb(NEW), txid_current() );
        RETURN NEW;
    else
        RETURN NULL;
    end if;

END;
$body$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS workflow_log_trigger on "Workflow";
CREATE TRIGGER workflow_log_trigger
AFTER INSERT OR UPDATE OR DELETE ON "Workflow"
FOR EACH ROW EXECUTE FUNCTION workflow_log();

CREATE OR REPLACE FUNCTION steps_workflow_log() RETURNS trigger AS $body$
DECLARE
    current_user_id uuid;
    current_membership_id uuid;
    current_tenant_id uuid;
    current_api_key_id uuid;
BEGIN
    if (current_setting('app.current_user_id', 't') != '') then
        current_user_id := (current_setting('app.current_user_id', 't')::uuid);
    end if;

    if (current_setting('app.current_membership_id', 't') != '') then
        current_membership_id := (current_setting('app.current_membership_id', 't')::uuid);
    end if;

    if (current_setting('app.current_tenant_id', 't') != '') then
        current_tenant_id := (current_setting('app.current_tenant_id', 't')::uuid);
    end if;

    if (current_setting('app.current_api_key_id', 't') != '') then
        current_api_key_id := (current_setting('app.current_api_key_id', 't')::uuid);
    end if;

    if (TG_OP = 'UPDATE') then
        INSERT INTO "AuditLog" ( id, "entityName", "entityId", "userId", "membershipId", "tenantId", "apiKeyId", operation, "oldData", "newData", "transactionId" ) values ( gen_random_uuid(), 'steps_workflow', NEW."A", current_user_id, current_membership_id, current_tenant_id, current_api_key_id, 'U', to_jsonb(OLD), to_jsonb(NEW), txid_current() );
        INSERT INTO "AuditLog" ( id, "entityName", "entityId", "userId", "membershipId", "tenantId", "apiKeyId", operation, "oldData", "newData", "transactionId" ) values ( gen_random_uuid(), 'steps_workflow', NEW."B", current_user_id, current_membership_id, current_tenant_id, current_api_key_id, 'U', to_jsonb(OLD), to_jsonb(NEW), txid_current() );
        RETURN NEW;
    elsif (TG_OP = 'DELETE') then
        INSERT INTO "AuditLog" ( id, "entityName", "entityId", "userId", "membershipId", "tenantId", "apiKeyId", operation, "oldData", "newData", "transactionId" ) values ( gen_random_uuid(), 'steps_workflow', OLD."A", current_user_id, current_membership_id, current_tenant_id, current_api_key_id, 'D', to_jsonb(OLD), null, txid_current() );
        INSERT INTO "AuditLog" ( id, "entityName", "entityId", "userId", "membershipId", "tenantId", "apiKeyId", operation, "oldData", "newData", "transactionId" ) values ( gen_random_uuid(), 'steps_workflow', OLD."B", current_user_id, current_membership_id, current_tenant_id, current_api_key_id, 'D', to_jsonb(OLD), null, txid_current() );
        RETURN OLD;
    elsif (TG_OP = 'INSERT') then
        INSERT INTO "AuditLog" ( id, "entityName", "entityId", "userId", "membershipId", "tenantId", "apiKeyId", operation, "oldData", "newData", "transactionId" ) values ( gen_random_uuid(), 'steps_workflow', NEW."A", current_user_id, current_membership_id, current_tenant_id, current_api_key_id, 'C', null, to_jsonb(NEW), txid_current() );
        INSERT INTO "AuditLog" ( id, "entityName", "entityId", "userId", "membershipId", "tenantId", "apiKeyId", operation, "oldData", "newData", "transactionId" ) values ( gen_random_uuid(), 'steps_workflow', NEW."B", current_user_id, current_membership_id, current_tenant_id, current_api_key_id, 'C', null, to_jsonb(NEW), txid_current() );
        RETURN NEW;
    else
        RETURN NULL;
    end if;

END;
$body$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS steps_workflow_log_trigger ON "_steps_workflow";
CREATE TRIGGER steps_workflow_log_trigger
AFTER INSERT OR UPDATE OR DELETE ON "_steps_workflow"
FOR EACH ROW EXECUTE FUNCTION steps_workflow_log();

