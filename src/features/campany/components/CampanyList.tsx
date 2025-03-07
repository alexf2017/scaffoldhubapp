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
import { CampanyActions } from 'src/features/campany/components/CampanyActions';
import CampanyListActions from 'src/features/campany/components/CampanyListActions';
import CampanyListFilter from 'src/features/campany/components/CampanyListFilter';
import { campanyFindManyApiCall } from 'src/features/campany/campanyApiCalls';
import {
  CampanyWithRelationships,
  campanyFilterInputSchema,
} from 'src/features/campany/campanySchemas';
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
import { CampanyNewButton } from 'src/features/campany/components/CampanyNewButton';
import { z } from 'zod';
import FileListItem from 'src/features/file/components/FileListItem';
import { FileUploaded } from 'src/features/file/fileSchemas';
import { Campany } from '@prisma/client';

const defaultData: Array<any> = [];

export default function CampanyList({ context }: { context: AppContext }) {
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
      z.input<typeof campanyFilterInputSchema>
    >(searchParams, campanyFilterInputSchema);
  }, [searchParams]);

  const columns: ColumnDef<CampanyWithRelationships>[] = [
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
      accessorKey: 'name',
      meta: {
        title: dictionary.campany.fields.name,
      },
    },
    {
      accessorKey: 'logo',
      meta: {
        title: dictionary.campany.fields.logo,
      },
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <span className="whitespace-nowrap">
            <FileListItem files={row.getValue('logo')} />
          </span>
        );
      },
    },
    {
      accessorKey: 'urlSiteOfficiel',
      meta: {
        title: dictionary.campany.fields.urlSiteOfficiel,
      },
    },
    {
      accessorKey: 'adresse',
      meta: {
        title: dictionary.campany.fields.adresse,
      },
    },
    {
      accessorKey: 'government',
      meta: {
        title: dictionary.campany.fields.government,
      },
    },
    {
      id: DataTableColumnIds.actions,
      meta: {
        sticky: true
      },
      cell: ({ row }) => (
        <CampanyActions
          mode="table"
          campany={row.original}
          context={context}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const query = useQuery({
    queryKey: ['campany', 'list', filter, sorting, pagination],
    queryFn: async ({ signal }) => {
      return campanyFindManyApiCall(
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
    data: query.data?.campanies || defaultData,
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
        <Breadcrumb items={[[dictionary.campany.list.menu]]} />
        <div className="flex gap-2">
          <CampanyListActions
            filter={filter}
            sorting={sorting}
            count={query.data?.count}
            table={table}
            context={context}
          />
        </div>
      </div>

      <CampanyListFilter context={context} isLoading={query.isLoading} />

      <DataTable
        table={table}
        isLoading={query.isLoading}
        columns={columns}
        dictionary={dictionary}
        notFoundText={dictionary.campany.list.noResults}
        newButton={<CampanyNewButton context={context} />}
      />

      <DataTablePagination table={table} />
    </div>
  );
}
