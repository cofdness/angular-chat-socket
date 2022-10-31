import { ColumnsFactory } from '../shared/interfaces/columns-factory';
import { ColumnDescriptor } from '../shared/models/column-descriptor';

export interface UserListColumnSelection {
  name: boolean;
  picture: boolean;
  action: boolean;
}

export class UserListColumnsFactory extends ColumnsFactory<UserListColumnSelection> {
  createColumnDescriptors(): Array<ColumnDescriptor> {
    return [
      {
        label: 'Name',
        field: 'name',
        checked: true,
      },
      {
        label: 'Picture',
        field: 'picture',
        checked: true,
      },
      {
        label: 'Action',
        field: 'action',
        checked: true,
      },
    ];
  }

  createColumnSelections(): UserListColumnSelection {
    return {
      name: true,
      picture: true,
      action: true,
    };
  }
}
