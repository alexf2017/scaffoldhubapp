import { Campany, Tenant, User } from '@prisma/client';
import { authSignUpController } from 'src/features/auth/controllers/authSignUpController';
import { campanyFindController } from 'src/features/campany/controllers/campanyFindController';
import { prismaAuth, prismaDangerouslyBypassAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error403 from 'src/shared/errors/Error403';
import { testContext } from 'src/shared/test/testContext';
import { v4 as uuid } from 'uuid';

async function createCampany(context: AppContext): Promise<any> {
  const prisma = prismaAuth(context);
  const currentTenant = await prisma.tenant.findFirstOrThrow();
  // TODO: Implement your own logic here
  // await prisma.campany.create({});
}

describe('campanyFind', () => {
  const prisma = prismaDangerouslyBypassAuth();
  let currentUser: User;
  let currentTenant: Tenant;
  let campany: Campany;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_TENANT_MODE = 'single';
  });

  beforeEach(async () => {
    await authSignUpController(
      {
        email: 'felipe@scaffoldhub.io',
        password: '12345678',
      },
      await testContext(),
    );
    currentUser = await prisma.user.findFirstOrThrow();
    currentTenant = await prisma.tenant.findFirstOrThrow();

    campany = await createCampany(
      await testContext({
        currentUserId: currentUser?.id,
        currentTenantId: currentTenant?.id,
      }),
    );
  });

  it('must be signed in', async () => {
    try {
      await campanyFindController(
        {
          id: campany?.id,
        },
        await testContext(),
      );
      fail();
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error403);
    }
  });

  it('must have permission', async () => {
    // remove permissions from user
    await prisma.membership.updateMany({
      data: {
        roles: [],
      },
    });

    try {
      await campanyFindController(
        {
          id: campany?.id,
        },
        await testContext({
          currentUserId: currentUser?.id,
          currentTenantId: currentTenant?.id,
        }),
      );
      fail();
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error403);
    }
  });

  it.skip('finds', async () => {
    const data = await campanyFindController(
      {
        id: campany?.id,
      },
      await testContext({
        currentUserId: currentUser?.id,
        currentTenantId: currentTenant?.id,
      }),
    );

    expect(data).toEqual(campany);
  });

  it('not found', async () => {
    try {
      await campanyFindController(
        {
          id: uuid(),
        },
        await testContext({
          currentUserId: currentUser?.id,
          currentTenantId: currentTenant?.id,
        }),
      );
      fail();
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
