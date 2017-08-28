import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '@angular/material';




import { MissionComponent} from './single/mission.component';
import { MissionTeamComponent} from './single/missionTeam.component';
import { MissionContentComponent} from './single/missionContent.component';
// import { MissionSingleComponent} from './missionSingle/missionSingle.component';
import { MissionService} from './mission.service';
import { MissionRouting} from './missionRouting.module';
import { MissionsComponent} from './list/missions.component';

// import { ProjectMissionsComponent} from './project/projectMissions.component';
import { QuoteModule} from '../quote/quote.module';

import { DragulaModule } from 'ng2-dragula';
// import { MissionDialogComponent } from './single/dialog/missionDialog.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {SharedModule } from '../shared/shared.module';
// import {UserModule} from '../user/user.module';
import {DocumentModule} from '../document/document.module';

@NgModule({
  imports:     [
    // UserModule,
    DragulaModule,
    MissionRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    QuoteModule,
    SharedModule,
    DocumentModule,

    // AutocompleteModule,
  ],
  declarations: [

    MissionComponent,
    MissionTeamComponent,
    MissionContentComponent,
    MissionsComponent,
    // ProjectMissionsComponent,
    // MissionDialogComponent,
    // MissionSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    MissionComponent,
    MissionTeamComponent,
    MissionsComponent,
    // AutocompleteComponent,
  ],
  providers:    [ MissionService ],
  entryComponents: [
    // MissionDialogComponent,
  ]
})
export class MissionModule { }
