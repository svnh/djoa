



export class ShowNavBarData {
  rightSideBar = new SideBarData()
  leftSideBar = new SideBarData()

}
export class SideBarData {
  showNavBar: boolean = false;
  search: Search = new Search();
}

export class Search {
    userId: string = '';
    typeObj: string = '';
    projectId: string = '';

}
