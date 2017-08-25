import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { StratsComponent} from './list/strats.component';
import { StratSingleComponent} from './single/stratSingle.component';
import { StratContentComponent} from './single/stratContent.component';
// import { StratTasksComponent} from './task/singleTask/stratTasks.component';

// import { TasksComponent} from './task/tasks/tasks.component';


export const routes: Routes = [
  {path: '', component: StratsComponent},
  // {path: 'tasks', component: TasksComponent},
  // {path: 'tasks/new', component: StratTasksComponent},
  // {path: 'tasks/:id', component: StratTasksComponent},

  // {path: 'stratSingle', component: StratSingleComponent},
  // {path: 'stratSingle/:id', component: StratSingleComponent},
  {path: 'new', component: StratSingleComponent},
  {path: 'new/:selectedIndex', component: StratSingleComponent},
  // {path: ':id/edit', component: StratSingleComponent},
  {path: ':id', component: StratContentComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StratRouting {}
