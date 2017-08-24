
export class Search {
    userId: string = '';
    typeObj: string = '';
    projectId: string = '';

}


export class ShowNavBarData {
  rightSideBar = new SideBar()
  leftSideBar = new SideBar()

}
export class SideBar {
  showNavBar: boolean = false;
  typeObj: string = '';
}
