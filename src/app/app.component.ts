import { Component, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { AuthService } from './auth/auth.service';
import { GlobalEventsManager } from './globalEventsManager';
import { ShowNavBarData} from './shared/shared.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mainScreen') elementView;
  loading: boolean = true;
  widthContainer: number = 0;
  isDesktopScreen = false;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    private router: Router,
    private authService: AuthService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }
  ngAfterViewInit() {
    const this2 = this
    setTimeout(() => {
      this2.widthContainer = this2.elementView.nativeElement.offsetWidth

      if (this2.widthContainer > 991) {
        this.globalEventsManager.isMobileSizeScreen(false);
        this.isDesktopScreen = true
      } else {
        this.globalEventsManager.isMobileSizeScreen(true);
      }


      // const newShowNavBarData = new ShowNavBarData();
      // newShowNavBarData.search.typeObj = 'project';
      // newShowNavBarData.search.typeScreen = 'object';
      // this2.globalEventsManager.showNavBarLeft(newShowNavBarData);
    });




  }




  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }


  // isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }
}
