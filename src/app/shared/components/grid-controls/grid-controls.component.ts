import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnDescriptor } from '../../models/column-descriptor';
import { BasicListItem } from '../../models/grid-menu-item';

@Component({
  selector: 'app-grid-controls',
  templateUrl: './grid-controls.component.html',
  styleUrls: ['./grid-controls.component.scss'],
})
export class GridControlsComponent {
  @Input()
  columns: Array<ColumnDescriptor> = [];

  @Input()
  menuItems: Array<BasicListItem> = [];

  @Input()
  filterable = false;

  @Input()
  hasFilters = false;

  @Input()
  hideColumnSelector = false;

  @Input()
  hideFilterButton = false;

  @Input()
  hideMoreOptions = false;

  @Input()
  disableColumnSelector = false;

  @Input()
  disableFilterButton = false;

  @Input()
  disableMoreOptions = false;

  @Input()
  clearButtonCaption = 'Clear all';

  @Input()
  myQueues = false;

  @Output()
  menuItemClick = new EventEmitter<string>();

  @Output()
  filterClick = new EventEmitter();

  @Output()
  clearFilters = new EventEmitter();

  @Output()
  applyColumnChooser = new EventEmitter<Array<ColumnDescriptor>>();

  @Output()
  resetColumnChooser = new EventEmitter();

  constructor() {}

  onClearFilters(): void {
    this.clearFilters.emit();
  }

  onClickFilter() {
    this.filterClick.emit();
  }
}
