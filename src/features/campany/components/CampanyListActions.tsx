'use client';

import { Campany } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Table } from '@tanstack/react-table';
import Link from 'next/link';
import { useState } from 'react';
import { FaPlus, FaRegFileExcel, FaTrashAlt } from 'react-icons/fa';
import { LuLoader2 } from 'react-icons/lu';
import { MdUpload } from 'react-icons/md';
import { RxDotsHorizontal } from 'react-icons/rx';
import {
  campanyDestroyManyApiCall,
  campanyFindManyApiCall,
} from 'src/features/campany/campanyApiCalls';
import { campanyExporterMapper } from 'src/features/campany/campanyExporterMapper';
import { campanyFilterInputSchema } from 'src/features/campany/campanySchemas';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { ConfirmDialog } from 'src/shared/components/ConfirmDialog';
import { DataTableViewOptions } from 'src/shared/components/dataTable/DataTableViewButton';
import { DataTableSort } from 'src/shared/components/dataTable/dataTableSchemas';
import { dataTableSortToPrisma } from 'src/shared/components/dataTable/dataTableSortToPrisma';
import { Button } from 'src/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/shared/components/ui/dropdown-menu';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { csvExporter } from 'src/shared/lib/csvExporter';
import { formatTranslation } from 'src/translation/formatTranslation';
import { z } from 'zod';

export default function CampanyListActions({
  context,
  table,
  count,
  filter,
  sorting,
}: {
  filter: z.input<typeof campanyFilterInputSchema>;
  sorting: DataTableSort;
  count?: number;
  context: AppContext;
  table: Table<Campany>;
}) {
  const { dictionary } = context;
  const queryClient = useQueryClient();

  const [destroyManyDialogOpen, setDestroyManyDialogOpen] = useState(false);

  const hasPermissionToCreate = hasPermission(permissions.campanyCreate, context);

  const hasPermissionToDestroy = hasPermission(
    permissions.campanyDestroy,
    context,
  );

  const hasPermissionToImport = hasPermission(permissions.campanyImport, context);

  const exportMutation = useMutation({
    mutationFn: () => {
      return campanyFindManyApiCall({
        filter: filter,
        orderBy: dataTableSortToPrisma(sorting),
      });
    },
    onSuccess: (data) => {
      csvExporter(
        campanyExporterMapper(data.campanies, context),
        dictionary.campany.fields,
        'campanies',
      );
      toast({
        description: dictionary.campany.export.success,
      });
    },
    onError: (error: any) => {
      toast({
        description: error.message || context.dictionary.shared.errors.unknown,
        variant: 'destructive',
      });
    },
  });

  const destroyMutation = useMutation({
    mutationFn: () => {
      const model = table.getFilteredSelectedRowModel();
      const ids = model.rows.map((r) => r.original.id);

      if (!ids.length) {
        throw new Error(context.dictionary.campany.destroyMany.noSelection);
      }

      return campanyDestroyManyApiCall(ids);
    },
    onSuccess: () => {
      table.resetRowSelection();
      queryClient.resetQueries({
        queryKey: ['campany'],
      });
      toast({
        description: dictionary.campany.destroyMany.success,
      });
    },
    onError: (error: any) => {
      toast({
        description: error.message || context.dictionary.shared.errors.unknown,
        variant: 'destructive',
      });
    },
  });

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  const isLoading = destroyMutation.isPending || exportMutation.isPending;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto flex h-8">
            {isLoading ? (
              <LuLoader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RxDotsHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {hasPermissionToDestroy && (
            <DropdownMenuItem
              onClick={() => setDestroyManyDialogOpen(true)}
              disabled={!selectedCount || destroyMutation.isPending}
            >
              <FaTrashAlt className="mr-2 h-4 w-4 text-foreground/50" />{' '}
              <span>{dictionary.shared.delete}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => exportMutation.mutateAsync()}
            disabled={!count || exportMutation.isPending}
          >
            <FaRegFileExcel className="mr-2 h-4 w-4 text-foreground/50" />{' '}
            <span>{dictionary.shared.exportToCsv}</span>
          </DropdownMenuItem>
          {hasPermissionToImport && (
            <DropdownMenuItem asChild>
              <Link href={`/campany/importer`} prefetch={false}>
                <MdUpload className="mr-2 h-4 w-4 text-foreground/50" />{' '}
                <span>{dictionary.shared.importer.title}</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DataTableViewOptions table={table} dictionary={context.dictionary} />

      {hasPermissionToCreate && (
        <Button
          size="sm"
          className="ml-auto flex h-8 whitespace-nowrap"
          asChild
        >
          <Link href={`/campany/new`} prefetch={false}>
            <FaPlus className="mr-2 h-4 w-4" />
            <span>{dictionary.shared.new}</span>
          </Link>
        </Button>
      )}

      {destroyManyDialogOpen && (
        <ConfirmDialog
          title={dictionary.campany.destroyMany.confirmTitle}
          description={formatTranslation(
            dictionary.campany.destroyMany.confirmDescription,
            selectedCount,
          )}
          confirmText={dictionary.shared.delete}
          variant="destructive"
          cancelText={dictionary.shared.cancel}
          onConfirm={() => {
            destroyMutation.mutateAsync();
            setDestroyManyDialogOpen(false);
          }}
          onCancel={() => setDestroyManyDialogOpen(false)}
        />
      )}
    </>
  );
}
