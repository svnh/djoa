


//
// export class ShowNavBarData {
//   rightSideBar = new SideBarData()
//   leftSideBar = new SideBarData()
//
// }
// export class SideBarData {
export class ShowNavBarData {
  showNavBar: boolean = true;
  search: Search = new Search();
}

export class Search {
    typeObj: string = '';
    typeScreen: string = 'object';
    userId: string = '';
    briefId: string = '';
    projectId: string = '';
    documentId: string = '';
    missionId: string = '';
    stratId: string = '';
    productId: string = '';
    search: string = '';
    // missionType: string = '';
    isExternalUser: boolean = false;

}
