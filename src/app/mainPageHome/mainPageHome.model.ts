


//
// export class ShowNavBarData {
//   rightSideBar = new SideBarData()
//   leftSideBar = new SideBarData()
//
// }
// export class SideBarData {
export class ShowNavBarData {
  showNavBar: boolean = false;
  search: Search = new Search();
}

export class Search {
    typeObj: string = '';
    userId: string = '';
    projectId: string = '';
    documentId: string = '';
    missionId: string = '';
    stratId: string = '';
    missionType: string = '';
    isExternalUser: boolean = false;

}
