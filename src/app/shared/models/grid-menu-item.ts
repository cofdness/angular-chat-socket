export interface BasicListItem {
  id?: number;
  icon: string;
  label: string;
  action?: string;
  disabled?: boolean;
}

export interface IncorporationListItem extends BasicListItem {
  color: string;
  code: string;
  description: string;
  status?: number;
}

export const GRID_MENU_ITEMS: Array<BasicListItem> = [
  {
    icon: 'refresh',
    action: 'refresh',
    label: 'Refresh Grid Data',
  },
  {
    icon: 'insert_drive_file',
    action: 'export-excel',
    label: 'Export to Excel',
  },
];
