import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { MaterialModule } from '@angular/material';




import { LogComponent} from './single/log.component';
// import { LogSingleComponent} from './logSingle/logSingle.component';
import { LogService} from './log.service';
import { LogRouting} from './logRouting.module';
import { LogsComponent} from './list/logs.component';

// import {PictureModule} from '../picture/picture.module';

// // import { QuoteModule} from '../quote/quote.module';

// import { DragulaModule } from 'ng2-dragula';
// import { LogDialogComponent } from './single/dialog/logDialog.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
// import {SharedModule } from '../shared/shared.module';
import {SharedSmallModule } from '../shared/sharedSmall.module';
// import {UserModule} from '../user/user.module';
// import { PictureComponent } from './picture/picture.component'




@NgModule({
  imports:     [
    // UserModule,
    // DragulaModule,
    SharedSmallModule,
    LogRouting,
    // CommonModule,
    // FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    // PictureModule,
    // QuoteModule,
    // SharedModule

    // AutocompleteModule,
  ],
  declarations: [

    LogComponent,
    LogsComponent,

    // LogDialogComponent,
    // PictureComponent,
    // LogSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    LogsComponent,
    // AutocompleteComponent,
  ],
  providers:    [ LogService ],
  entryComponents: [
    // LogDialogComponent,
  ]
})
export class LogModule { }
