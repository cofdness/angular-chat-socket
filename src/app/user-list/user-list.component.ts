import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { queryGraphql } from '../graphql/query.graphql';
import { subscriptionGraphql } from '../graphql/subscription.graphql';
import { ApolloQueryResult, NetworkStatus } from '@apollo/client';
import { UsersQuery } from '../models/user-query.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user';
import { MatTableFilter } from 'mat-table-filter';
import { GRID_MENU_ITEMS } from '../shared/models/grid-menu-item';
import { ColumnDescriptor } from '../shared/models/column-descriptor';
import {
  UserListColumnSelection,
  UserListColumnsFactory,
} from '../models/user-list-column-selection.model';
import { ACTION_MENU } from '../shared/constants/column.constants';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import * as XLSX from 'xlsx';

export const emptyUser = {
  data: {
    users: [
      {
        id: '',
        name: '',
        picture: '',
        email: '',
      },
    ],
  },
  loading: false,
  networkStatus: NetworkStatus.error,
};

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterEntity!: User;
  filterType = MatTableFilter.ANYWHERE;
  // fetch user list, live update if new user create.
  usersQuery: QueryRef<UsersQuery>;
  users: ApolloQueryResult<UsersQuery> = emptyUser;
  displayedColumns: string[] = ['name', 'picture', 'action'];

  readonly menuItems = GRID_MENU_ITEMS;
  columns: Array<ColumnDescriptor> = [];
  filterable = false;
  hasFilters = false;
  columnSelections: UserListColumnSelection = {
    name: true,
    picture: true,
    action: true,
  };
  dataSource = new MatTableDataSource<User>(emptyUser.data.users);
  filterForm!: FormGroup;

  private columnsFactory: UserListColumnsFactory;

  constructor(public authService: AuthService, private apollo: Apollo) {
    this.initFilterEntity();
    this.initFilterFormGroup();
    this.usersQuery = apollo.watchQuery<UsersQuery>({
      query: queryGraphql.users,
    });
    this.usersQuery.valueChanges.subscribe({
      next: (response) => {
        this.users = response;
        this.dataSource = new MatTableDataSource<User>(this.users.data.users);
      },
    });
    this.columnsFactory = new UserListColumnsFactory();
  }

  ngOnInit() {
    this.initColumns();
    this.usersQuery.subscribeToMore({
      document: subscriptionGraphql.newUserEvent,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        return {
          ...prev,
          users: [subscriptionData.data.newUserEvent, ...prev.users],
        };
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilterClick(): void {
    this.filterable = !this.filterable;
  }

  onClearFilters(): void {
    this.filterable = false;
    this.hasFilters = false;
    this.initFilterEntity();
  }

  onApplyColumnChooser(columnsChooser: Array<ColumnDescriptor>): void {
    this.columnSelections = this.columnsFactory.changeColumns(columnsChooser);
  }

  onResetColumnChooser(): void {
    this.columnSelections = this.columnsFactory.createColumnSelections();
  }

  onMenuActionClick(event: string): void {
    if (event === ACTION_MENU.REFRESH) {
      this.columnSelections = this.columnsFactory.createColumnSelections();
      this.onClearFilters();
    }
    if (event === ACTION_MENU.EXPORT_EXCEL) {
      const workSheet = XLSX.utils.json_to_sheet(
        this.dataSource.data.map((user) => ({
          name: user.name,
          picture: user.picture,
        })),
        {
          header: ['name', 'picture'],
        }
      );
      const workBook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
      XLSX.writeFile(workBook, 'userList.xlsx');
    }
  }

  private initColumns(): void {
    this.columns = this.columnsFactory.createColumnDescriptors();
    this.columnSelections = this.columnsFactory.createColumnSelections();
  }

  private initFilterEntity(): void {
    this.filterEntity = {
      id: '',
      name: '',
      picture: '',
      email: '',
    };
  }

  private initFilterFormGroup(): void {
    this.filterForm = new FormGroup({
      name: new FormControl(''),
    });
    this.filterForm.get('name')?.valueChanges.subscribe({
      next: (name) => {
        this.filterEntity.name = name;
        this.hasFilters = true;
      },
    });
  }
}
