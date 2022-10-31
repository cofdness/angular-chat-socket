import { Component, OnInit } from '@angular/core';
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
})
export class UserListComponent implements OnInit {
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
      // export to excel
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
