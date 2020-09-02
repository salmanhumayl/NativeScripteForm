import { OnInit,Component } from "@angular/core";

import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import {Page, EventData} from 'tns-core-modules/ui/page';
import {RouterExtensions} from "@nativescript/angular/router";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private page:Page, private routerExt:RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.page.backgroundImage="http://portal.ajes.ae/epro/ajesbg.png";
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(arg)
    {
        this.routerExt.navigate(["/approvedrequest"], { clearHistory: false });

    }
}
