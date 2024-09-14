import { FaChartPie } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { LuBarChart, LuFile, LuHistory, LuHome, LuLayoutGrid, LuLayoutList, LuList, LuLocate, LuProjector, LuUsers, LuWholeWord, LuWorkflow } from 'react-icons/lu';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';

export function menus(context: AppContext) {
  const menus: Array<{
    id: string;
    label: string;
    href: string;
    Icon: IconType;
    isExact?: boolean;
  }> = [];

  menus.push({
    id: 'dashboard',
    label: context.dictionary.shared.dashboard,
    href: `/`,
    Icon: FaChartPie,
    isExact: true,
  });

  if (hasPermission(permissions.auditLogRead, context)) {
    menus.push({
      id: 'auditLog',
      label: context.dictionary.auditLog.list.menu,
      href: `/audit-log`,
      Icon: LuHistory,
    });
  }

  if (hasPermission(permissions.membershipRead, context)) {
    menus.push({
      id: 'membership',
      label: context.dictionary.membership.list.menu,
      href: `/membership`,
      Icon: LuUsers,
    });
  }

  if (hasPermission(permissions.projetRead, context)) {
    menus.push({
      id: 'projet',
      label: context.dictionary.projet.list.menu,
      href: `/projet`,
      Icon: LuList,
    });
  }
  if (hasPermission(permissions.livrableRead, context)) {
    menus.push({
      id: 'livrable',
      label: context.dictionary.livrable.list.menu,
      href: `/livrable`,
      Icon: LuFile,
    });
  }
  if (hasPermission(permissions.workflowRead, context)) {
    menus.push({
      id: 'workflow',
      label: context.dictionary.workflow.list.menu,
      href: `/workflow`,
      Icon: LuWorkflow,
    });
  }
  if (hasPermission(permissions.stepsRead, context)) {
    menus.push({
      id: 'steps',
      label: context.dictionary.steps.list.menu,
      href: `/steps`,
      Icon: LuBarChart,
    });
  }
  if (hasPermission(permissions.workflowStepRead, context)) {
    menus.push({
      id: 'workflowStep',
      label: context.dictionary.workflowStep.list.menu,
      href: `/workflow-step`,
      Icon: LuWholeWord,
    });
  }
  if (hasPermission(permissions.statusRead, context)) {
    menus.push({
      id: 'status',
      label: context.dictionary.status.list.menu,
      href: `/status`,
      Icon: LuLocate,
    });
  }
  if (hasPermission(permissions.campanyRead, context)) {
    menus.push({
      id: 'campany',
      label: context.dictionary.campany.list.menu,
      href: `/campany`,
      Icon: LuHome,
    });
  }
  if (hasPermission(permissions.commentRead, context)) {
    menus.push({
      id: 'comment',
      label: context.dictionary.comment.list.menu,
      href: `/comment`,
      Icon: LuLayoutGrid,
    });
  }

  return menus;
}
