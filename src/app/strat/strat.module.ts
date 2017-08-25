import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '@angular/material';

// import { StratDialogComponent } from './single/dialog/stratDialog.component';

// import { StratTasksComponent} from './task/singleTask/stratTasks.component';
import { StratsComponent} from './list/strats.component';
import { StratSingleComponent} from './single/stratSingle.component';
import { StratContentComponent} from './single/stratContent.component';
import { StratService} from './strat.service';
import { StratRouting} from './stratRouting.module';

// import { TasksComponent} from './task/tasks/tasks.component';

import { TaskService} from '../task/task.service';
import { MissionModule} from '../mission/mission.module';

import { DragulaModule } from 'ng2-dragula';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {SharedModule } from '../shared/shared.module';
// import {CommentModule} from '../comment/comment.module';
// import { TaskDialogComponent } from '../task/single/dialog/taskDialog.component'

// import { CommentComponent } from './single/comment/comment.component'
// import { PictureComponent } from './single/picture/picture.component'


@NgModule({
  imports:     [
    // UserModule,
    DragulaModule,
    StratRouting,
    // CommonModule,
    // FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    MissionModule,
    SharedModule,
    // CommentModule,


    // AutocompleteModule,
  ],
  declarations: [
    // StratTasksComponent,
    StratsComponent,
    StratSingleComponent,
    StratContentComponent,
    // TasksComponent,
    // StratDialogComponent,
    // CommentComponent,
    // PictureComponent,
    // TaskDialogComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    StratSingleComponent,
    StratsComponent,
    StratContentComponent,

    // StratsComponent,
    // AutocompleteComponent,
  ],
  providers:    [
    StratService,
    // TaskService
  ],
  entryComponents: [
    // StratDialogComponent,
    // TaskDialogComponent,
  ]
})
export class StratModule { }
