import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ColumnDescriptor } from '../../models/column-descriptor';

@Component({
  selector: 'app-grid-column-chooser',
  templateUrl: './grid-column-chooser.component.html',
  styleUrls: ['./grid-column-chooser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridColumnChooserComponent implements OnInit {
  @Input()
  disabled = false;
  @Output() eventNotes = new EventEmitter<Array<ColumnDescriptor>>();
  @Output() eventNotesReset = new EventEmitter();
  columnsCopy: Array<ColumnDescriptor> = [];
  allChecked = false;

  private originalColumns!: Array<ColumnDescriptor>;

  constructor() {}

  @Input()
  set columns(value: Array<ColumnDescriptor>) {
    this.columnsCopy = value?.map((column) => ({ ...column }));
    this.originalColumns = value;
    this.updateAllChecked();
  }

  ngOnInit() {}

  onApplySelections() {
    this.eventNotes.emit(this.columnsCopy);
  }

  onResetSelections() {
    this.columnsCopy = this.originalColumns.map((column) => ({ ...column }));
    this.updateAllChecked();
    this.eventNotesReset.emit();
  }

  updateAllChecked() {
    this.allChecked =
      this.columnsCopy != null &&
      this.columnsCopy.filter((c) => !c.disabled).every((t) => t.checked);
  }

  someChecked(): boolean {
    if (this.columnsCopy == null) {
      return false;
    }
    return (
      this.columnsCopy.filter((t) => t.checked && !t.disabled).length > 0 &&
      !this.allChecked
    );
  }

  setAll(checked: boolean) {
    this.allChecked = checked;
    if (this.columnsCopy == null) {
      return;
    }
    this.columnsCopy
      .filter((c) => !c.disabled)
      .forEach((t) => (t.checked = checked));
  }
}
