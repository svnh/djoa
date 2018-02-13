import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';





import { MissionComponent} from './single/mission.component';
import { NewMissionBox} from './single/newMissionBox.component';
import { MissionChatComponent} from './single/missionChat.component';
import { MissionTeamComponent} from './single/missionTeam.component';
import { MissionContentComponent} from './single/missionContent.component';
// import { MissionSingleComponent} from './missionSingle/missionSingle.component';
import { MissionService} from './mission.service';
import { MissionRouting} from './missionRouting.module';
import { MissionsComponent} from './list/missions.component';
import { LightMissionsComponent} from './list/lightMissions.component';
// import { MatSelectModule} from '@angular/material/select';
// import { ProjectMissionsComponent} from './project/projectMissions.component';
// // import { QuoteModule} from '../quote/quote.module';


// import { MissionDialogComponent } from './single/dialog/missionDialog.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {SharedModule } from '../shared/shared.module';
// import {UserModule} from '../user/user.module';
import {DocumentModule} from '../document/document.module';
import {ChatModule} from '../chat/chat.module';




@NgModule({
  imports:     [
    // UserModule,
    MissionRouting,
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    // QuoteModule,
    SharedModule,
    DocumentModule,
    ChatModule,
    // MatSelectModule,
    // AutocompleteModule,
  ],
  declarations: [

    MissionComponent,
    MissionTeamComponent,
    MissionContentComponent,
    MissionsComponent,
    LightMissionsComponent,
    MissionChatComponent,
    NewMissionBox,
    // ProjectMissionsComponent,
    // MissionDialogComponent,
    // MissionSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    MissionComponent,
    NewMissionBox,
    MissionTeamComponent,
    MissionsComponent,
    LightMissionsComponent,
    // AutocompleteComponent,
  ],
  providers:    [ MissionService ],
  entryComponents: [
    // MissionDialogComponent,
  ]
})
export class MissionModule { }
