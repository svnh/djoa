import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';


// import { ProjectModule} from '../project/project.module';

import { MainPageHomeComponent} from './mainPageHome.component';
// import { EditReportingComponent} from './single/editReporting.component';


// import { ReportingService} from './reporting.service';
import { MainPageHomeRouting} from './mainPageHomeRouting.module';
// import { MaterialModule } from '@angular/material';

// import { ProductModule } from '../product/product.module';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

// import {SharedModule } from '../shared/shared.module';
// import { SignaturePadModule } from 'angular2-signaturepad';
// import { ChartsModule } from 'ng2-charts/ng2-charts';

// import { SideBarRightModule } from '../nav/sideBarRight/sideBarRight.module';
// import { SideBarLeftModule } from '../nav/sideBarLeft/sideBarLeft.module';




@NgModule({
  imports:      [
    // ProjectModule,

    MainPageHomeRouting,
    CommonModule,
    FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    // ProductModule,
    // SharedModule,
    // SideBarRightModule,
    // SideBarLeftModule,
    // SignaturePadModule,
    // ChartsModule,
    // AutocompleteComponent,
  ],
  declarations: [
    MainPageHomeComponent,



    // AutocompleteComponent
  ],
  exports:      [
    MainPageHomeComponent,

    // AutocompleteComponent,
  ],
  providers:    [
   ],
  entryComponents: [ ]
})
export class MainPageHomeModule { }
