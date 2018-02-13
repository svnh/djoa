import {Component, OnInit, OnChanges, Input} from '@angular/core';

import { Search } from '../../../shared/shared.model';
import {ShowNavBarData} from '../../../shared/shared.model';
import { ProjectService} from '../../../project/project.service';
import { Project} from '../../../project/project.model';
import {GlobalEventsManager} from '../../../globalEventsManager';
import {Router} from '@angular/router';

@Component({
  selector: 'app-go-back-to-project',
  templateUrl: './goBackToProject.component.html',
  styleUrls: ['./goBackToProject.component.css']
})

export class GoBackToProjectComponent implements OnInit, OnChanges {

  @Input() search: Search = new Search();
  @Input() isDesktopScreen = false;
  fetchedProject: Project = new Project();
  showNavBarData: ShowNavBarData = new ShowNavBarData();

  constructor(
    private globalEventsManager: GlobalEventsManager,
    private projectService: ProjectService,
    private router: Router,
  ) {
    this.globalEventsManager.showNavBarEmitterLeft.subscribe((showNavBarData) => {
        if (showNavBarData !== null) {
          this.showNavBarData = showNavBarData;
        }
    })

  }


  ngOnInit() {}
  ngOnChanges() {
    if (this.showNavBarData.search.projectId) {
      this.getProject(this.showNavBarData.search.projectId);
    }
  }

  goTo(typeObj: string, stratId: string) {
    this.router.navigate([typeObj + '/' + stratId]);
    if (!this.isDesktopScreen) {
      this.closeLeft();
    }
  }

  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe(
        res => {
          this.fetchedProject = <Project>res;
        },
        error => {
          console.log(error);
        }
      )
  }
  closeLeft() {

    this.showNavBarData.showNavBar = -1;
    this.globalEventsManager.showNavBarLeft(this.showNavBarData);
  }

}
