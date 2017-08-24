import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GlobalEventsManager {

    private _showNavBar: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public showNavBarEmitter: Observable<any> = this._showNavBar.asObservable();

    constructor() {}

    showNavBar(ifShow: any) {
        this._showNavBar.next(ifShow);
    }


}
