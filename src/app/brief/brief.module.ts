import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '@angular/material';

// import { BriefDialogComponent } from './single/dialog/briefDialog.component';

// import { BriefTasksComponent} from './task/singleTask/briefTasks.component';
import { BriefsComponent} from './list/briefs.component';
import { BriefSingleComponent} from './single/briefSingle.component';
// import { BriefContentComponent} from './single/briefContent.component';
import { BriefService} from './brief.service';
import { BriefRouting} from './briefRouting.module';

// import { TasksComponent} from './task/tasks/tasks.component';

import { TaskService} from '../task/task.service';
// import { MissionModule} from '../mission/mission.module';

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
    // DragulaModule,
    BriefRouting,
    // CommonModule,
    // FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    // MissionModule,
    SharedModule,
    // CommentModule,


    // AutocompleteModule,
  ],
  declarations: [
    // BriefTasksComponent,
    BriefsComponent,
    BriefSingleComponent,
    // BriefContentComponent,
    // TasksComponent,
    // BriefDialogComponent,
    // CommentComponent,
    // PictureComponent,
    // TaskDialogComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    BriefSingleComponent,
    BriefsComponent,
    // BriefContentComponent,

    // BriefsComponent,
    // AutocompleteComponent,
  ],
  providers:    [
    BriefService,
    // TaskService
  ],
  entryComponents: [
    // BriefDialogComponent,
    // TaskDialogComponent,
  ]
})
export class BriefModule { }
