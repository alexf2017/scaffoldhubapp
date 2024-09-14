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
import { LivrableActions } from 'src/features/livrable/components/LivrableActions';
import LivrableListActions from 'src/features/livrable/components/LivrableListActions';
import LivrableListFilter from 'src/features/livrable/components/LivrableListFilter';
import { livrableFindManyApiCall } from 'src/features/livrable/livrableApiCalls';
import {
  LivrableWithRelationships,
  livrableFilterInputSchema,
} from 'src/features/livrable/livrableSchemas';
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
import { LivrableNewButton } from 'src/features/livrable/components/LivrableNewButton';
import { z } from 'zod';
import FileListItem from 'src/features/file/components/FileListItem';
import { FileUploaded } from 'src/features/file/fileSchemas';
import { Status } from '@prisma/client';
import { StatusLink } from 'src/features/status/components/StatusLink';
import { Livrable } from '@prisma/client';

const defaultData: Array<any> = [];

export default function LivrableList({ context }: { context: AppContext }) {
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
      z.input<typeof livrableFilterInputSchema>
    >(searchParams, livrableFilterInputSchema);
  }, [searchParams]);

  const columns: ColumnDef<LivrableWithRelationships>[] = [
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
      accessorKey: 'title',
      meta: {
        title: dictionary.livrable.fields.title,
      },
      cell: ({ getValue, row }) => (
        <span className="whitespace-nowrap">
          <Link
            className="text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400"
            href={`/livrable/${row?.original?.id}`}
            prefetch={false}
          >
            {getValue() as string}
          </Link>
        </span>
      ),
    },
    {
      accessorKey: 'document',
      meta: {
        title: dictionary.livrable.fields.document,
      },
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <span className="whitespace-nowrap">
            <FileListItem files={row.getValue('document')} />
          </span>
        );
      },
    },
    {
      accessorKey: 'statusname',
      meta: {
        title: dictionary.livrable.fields.statusname,
      },
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <StatusLink
            status={row.getValue('statusname')}
            context={context}
          />
        );
      },
    },
    {
      id: DataTableColumnIds.actions,
      meta: {
        sticky: true
      },
      cell: ({ row }) => (
        <LivrableActions
          mode="table"
          livrable={row.original}
          context={context}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const query = useQuery({
    queryKey: ['livrable', 'list', filter, sorting, pagination],
    queryFn: async ({ signal }) => {
      return livrableFindManyApiCall(
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
    data: query.data?.livrables || defaultData,
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
        <Breadcrumb items={[[dictionary.livrable.list.menu]]} />
        <div className="flex gap-2">
          <LivrableListActions
            filter={filter}
            sorting={sorting}
            count={query.data?.count}
            table={table}
            context={context}
          />
        </div>
      </div>

      <LivrableListFilter context={context} isLoading={query.isLoading} />

      <DataTable
        table={table}
        isLoading={query.isLoading}
        columns={columns}
        dictionary={dictionary}
        notFoundText={dictionary.livrable.list.noResults}
        newButton={<LivrableNewButton context={context} />}
      />

      <DataTablePagination table={table} />
    </div>
  );
}
