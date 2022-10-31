import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { GridControlsComponent } from './components/grid-controls/grid-controls.component';
import { GridColumnChooserComponent } from './components/grid-column-chooser/grid-column-chooser.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GridControlsComponent, GridColumnChooserComponent],
  imports: [CommonModule, SharedRoutingModule, MaterialModule, FormsModule],
  exports: [GridControlsComponent],
})
export class SharedModule {}
