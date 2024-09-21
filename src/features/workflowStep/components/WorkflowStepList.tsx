'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { WorkflowStepActions } from 'src/features/workflowStep/components/WorkflowStepActions';
import WorkflowStepListActions from 'src/features/workflowStep/components/WorkflowStepListActions';
import WorkflowStepListFilter from 'src/features/workflowStep/components/WorkflowStepListFilter';
import { workflowStepCurrentUserFindManyApiCall, workflowStepFindManyApiCall } from 'src/features/workflowStep/workflowStepApiCalls';
import {
  WorkflowStepWithRelationships,
  workflowStepFilterInputSchema,
} from 'src/features/workflowStep/workflowStepSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import DataTable from 'src/shared/components/dataTable/DataTable';
import { DataTableColumnIds } from 'src/shared/components/dataTable/DataTableColumnHeader';
import { DataTablePagination } from 'src/shared/components/dataTable/DataTablePagination';
import { DataTableQueryParams } from 'src/shared/components/dataTable/DataTableQueryParams';
import { dataTableHeader } from 'src/shared/components/dataTable/dataTableHeader';
import { dataTablePageCount } from 'src/shared/components/dataTable/dataTablePageCount';
import { dataTableSortToPrisma } from 'src/shared/components/dataTable/dataTableSortToPrisma';
import { Checkbox } from 'src/shared/components/ui/checkbox';
import { AppContext } from 'src/shared/controller/appContext';
import { WorkflowStepNewButton } from 'src/features/workflowStep/components/WorkflowStepNewButton';
import { z } from 'zod';
import { Steps } from '@prisma/client';
import { StepsLink } from 'src/features/steps/components/StepsLink';
import { Workflow } from '@prisma/client';
import { WorkflowLink } from 'src/features/workflow/components/WorkflowLink';
import { Membership } from '@prisma/client';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { Livrable } from '@prisma/client';
import { LivrableLink } from 'src/features/livrable/components/LivrableLink';
import { WorkflowStep } from '@prisma/client';

const defaultData: Array<any> = [];

export default function WorkflowStepList({ context }: { context: AppContext }) {
  const { dictionary } = context;
  const router = useRouter();
  const searchParams = useSearchParams();

  const sorting = useMemo(() => {
    return DataTableQueryParams.getSorting(searchParams);
  }, [searchParams]);

  const pagination = useMemo(() => {
    return DataTableQueryParams.getPagination(searchParams);
  }, [searchParams]);

  const filter = useMemo(() => {
    return DataTableQueryParams.getFilter<
      z.input<typeof workflowStepFilterInputSchema>
    >(searchParams, workflowStepFilterInputSchema);
  }, [searchParams]);

  const columns: ColumnDef<WorkflowStepWithRelationships>[] = [
    {
      id: DataTableColumnIds.select,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={dictionary.shared.dataTable.selectAll}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={dictionary.shared.dataTable.selectRow}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'order',
      meta: {
        title: dictionary.workflowStep.fields.order,
      },
      header: dataTableHeader('right', dictionary),
      cell: ({ getValue, row }) => (
        <span className="whitespace-nowrap flex justify-end">
          <Link
            className="zzz text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400"
            href={`/workflow-step/${row?.original?.id}`}
            prefetch={false}
          >
            {getValue() as string}
          </Link>
        </span>
      ),
    },
    {
      accessorKey: 'responsible',
      meta: {
        title: dictionary.workflowStep.fields.responsible,
      },
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <MembershipLink
            membership={row.getValue('responsible')}
            context={context}
          />
        );
      },
    },
    {
      accessorKey: 'observer',
      meta: {
        title: dictionary.workflowStep.fields.observer,
      },
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <MembershipLink
            membership={row.getValue('observer')}
            context={context}
          />
        );
      },
    },
    {
      accessorKey: 'livrable',
      meta: {
        title: dictionary.workflowStep.fields.livrable,
      },
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <LivrableLink
            livrable={row.getValue('livrable')}
            context={context}
          />
        );
      },
    },
    {
      accessorKey: 'steptitle',
      meta: {
        title: dictionary.workflowStep.fields.steptitle,
      },
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <StepsLink
            steps={row.getValue('steptitle')}
            context={context}
          />
        );
      },
    },
    {
      accessorKey: 'workFlow',
      meta: {
        title: dictionary.workflowStep.fields.workFlow,
      },
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <WorkflowLink
            workflow={row.getValue('workFlow')}
            context={context}
          />
        );
      },
    },
    {
      accessorKey: 'isDone',
      meta: {
        title: dictionary.workflowStep.fields.isDone,
      },
      cell: ({ row }) => {
        return row.getValue('isDone')
          ? dictionary.shared.yes
          : dictionary.shared.no;
      },
    },
    {
      id: DataTableColumnIds.actions,
      meta: {
        sticky: true
      },
      cell: ({ row }) => (
        <WorkflowStepActions
          mode="table"
          workflowStep={row.original}
          context={context}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const query = useQuery({
    queryKey: ['workflowStep', 'list', filter, sorting, pagination],
    queryFn: async ({ signal }) => {
      return workflowStepCurrentUserFindManyApiCall(
        {
          filter: filter,
          skip: pagination.pageIndex * pagination.pageSize,
          take: pagination.pageSize,
          orderBy: dataTableSortToPrisma(sorting),
        },
        signal,
      );
    },
  });

  const table = useReactTable({
    getRowId: ({ originalRow, index }) => originalRow?.id || index,
    data: query.data?.workflowSteps || defaultData,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      header: dataTableHeader('left', dictionary),
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue() as string}</span>
      ),
    },
    state: {
      sorting,
      pagination,
    },
    onSortingChange: DataTableQueryParams.onSortingChange(
      sorting,
      router,
      searchParams,
    ),
    onPaginationChange: DataTableQueryParams.onPaginationChange(
      pagination,
      router,
      searchParams,
    ),
    manualSorting: true,
    manualPagination: true,
    pageCount: dataTablePageCount(query.data?.count, pagination),
    meta: {
      count: query.data?.count,
    },
  });

  return (
    <div className="mb-4 flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[[dictionary.workflowStep.list.menu]]} />
        <div className="flex gap-2">
          <WorkflowStepListActions
            filter={filter}
            sorting={sorting}
            count={query.data?.count}
            table={table}
            context={context}
          />
        </div>
      </div>

      <WorkflowStepListFilter context={context} isLoading={query.isLoading} />

      <DataTable
        table={table}
        isLoading={query.isLoading}
        columns={columns}
        dictionary={dictionary}
        notFoundText={dictionary.workflowStep.list.noResults}
        newButton={<WorkflowStepNewButton context={context} />}
      />

      <DataTablePagination table={table} />
    </div>
  );
}
