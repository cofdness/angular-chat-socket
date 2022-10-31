export interface ColumnDescriptor {
  label: string;
  field: string;
  checked?: boolean;
  disabled?: boolean;
  filtered?: boolean;
  clickable?: boolean;
  selectable?: boolean;
  editable?: boolean;
  type?: string;
  order?: number;
}
