import { ColumnDescriptor } from '../models/column-descriptor';
import { SELECTION_COLUMN } from '../constants/column.constants';

export abstract class ColumnsFactory<TSelections> {
  abstract createColumnDescriptors(): Array<ColumnDescriptor>;

  abstract createColumnSelections(): TSelections;

  changeColumns(columns: Array<ColumnDescriptor>): TSelections {
    const result = this.createColumnSelections();

    // @ts-ignore
    columns.forEach((column) => (result[column.field] = column.checked));

    return result;
  }

  /**
   * Return the selection state of the selectable grid
   * @param columns The column description of grid.
   * @requires The selection field of column selection model should be named "selectionColumn"
   * @return Hide selection column if all data columns in grid are hidden
   */
  changeColumnsWithSelection(columns: Array<ColumnDescriptor>): TSelections {
    const result = this.createColumnSelections();

    // @ts-ignore
    columns.forEach((column) => (result[column.field] = column.checked));

    // @ts-ignore
    result[SELECTION_COLUMN] =
      columns.filter((col) => col.checked === true).length !== 0;

    return result;
  }
}
