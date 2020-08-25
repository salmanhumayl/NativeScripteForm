import { Component, OnInit } from "@angular/core";
import { NavigationEnd,NavigationStart, Router, RouterEvent } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import * as application from "tns-core-modules/application";


import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";

import {TokenParams} from "./models/TokenParams";

import { EmployeeDetail } from "./models/login/EmployeeDetail";

import { AppGlobals } from '../app.global';



@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    showloadingindicator=true;
    constructor(private router: Router, private routerExtensions: RouterExtensions,
                     private _global: AppGlobals) {


        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._global.isvalid=false;



        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);


        application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {

            if (this.router.url=="/pendings") {
                args.cancel = true;
                    confirm({
                        title: "AJES-eForm",
                        message: "are you sure you want to logout",
                        okButtonText: "Yes",
                        cancelButtonText: "No"

                    }).then((result) => {
                        if(result==true)
                            this.logout();
                    });

            }

            else if (this.routerExtensions.canGoBack()) {
                args.cancel = true;
                this.routerExtensions.back();
            } else {

            }
        });


    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {

        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {

        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
    logout(){

        TokenParams.secureStorage.removeAll();
        this._global.isvalid=false;

        this.routerExtensions.navigate(["/login"], { clearHistory: true });

    }
}
