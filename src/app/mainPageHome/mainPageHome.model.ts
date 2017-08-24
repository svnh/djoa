



export class ShowNavBarData {
  rightSideBar = new SideBar()
  leftSideBar = new SideBar()

}
export class SideBar {
  showNavBar: boolean = false;
  search: Search = new Search();
}

export class Search {
    userId: string = '';
    typeObj: string = '';
    projectId: string = '';

}
