
  export class ShowNavBarData {
    showNavBar: number = 0;
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
      categorieId: string = '';
      search: string = '';
      orderBy: string = '';
      start: Date;
      isInSideBar = false;
      // startString: string = '';
      end: Date;
      // endString: string = '';
      // missionType: string = '';
      isExternalUser: boolean = false;
      myDocuments: boolean = true;

  }

  export class PaginationData {
    currentPage: number = 1;
    itemsPerPage: number = 0;
    totalItems: number = 0;
  };
