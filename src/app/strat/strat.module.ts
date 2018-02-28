import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StratComponent} from './single/strat.component';
import { StratContentComponent} from './single/stratContent.component';
import { StratTeamComponent} from './single/stratTeam.component';
import { StratService} from './strat.service';
import { StratRouting} from './stratRouting.module';
import { StratsComponent} from './list/strats.component';
import { LightStratsComponent} from './list/lightStrats.component';
import { SharedModule } from '../shared/shared.module';
import { DocumentModule} from '../document/document.module';
import { BriefModule} from '../brief/brief.module';
import { ChatModule} from '../chat/chat.module';
// import { StratTeamComponent} from './single/stratTeam.component';
// import { StratSingleComponent} from './stratSingle/stratSingle.component';

// import { ProjectStratsComponent} from './project/projectStrats.component';
// import { QuoteModule} from '../quote/quote.module';

// import { DragulaModule } from 'ng2-dragula';
// import { StratDialogComponent } from './single/dialog/stratDialog.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
// import {UserModule} from '../user/user.module';



@NgModule({
  imports:     [
    // UserModule,
    // DragulaModule,
    StratRouting,
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    // QuoteModule,
    SharedModule,
    DocumentModule,
    BriefModule,
    ChatModule,

    // AutocompleteModule,
  ],
  declarations: [

    StratComponent,
    // StratTeamComponent,
    StratContentComponent,
    StratTeamComponent,
    StratsComponent,
    LightStratsComponent,
    // ProjectStratsComponent,
    // StratDialogComponent,
    // StratSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    StratComponent,
    // StratTeamComponent,
    LightStratsComponent,
    StratsComponent,
    StratTeamComponent,
    // AutocompleteComponent,
  ],
  providers:    [ StratService ],
  entryComponents: [
    // StratDialogComponent,
  ]
})
export class StratModule { }
