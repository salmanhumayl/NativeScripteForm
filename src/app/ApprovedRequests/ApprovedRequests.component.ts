import { Component, OnInit } from "@angular/core";
import {RouterExtensions} from "@nativescript/angular/router";
import { ActivatedRoute, Router } from "@angular/router";

import{PendingApproval} from "../models/Dashboard/PendingApproval"

import { LoginService } from "../Login/login.service";

import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {TokenParams} from "../models/TokenParams";


@Component({
    selector: "ApprovedRequests",
    templateUrl: "./ApprovedRequests.component.html",
    styleUrls: ['ApprovedRequests.component.css'],
    providers:[LoginService]
})

export class ApprovedRequestsComponent implements OnInit {

    isWaiting:boolean=false;
    pendings:PendingApproval[];
    mUserName:string;


    constructor(private route: ActivatedRoute,private router:Router,
        private routerExt:RouterExtensions,
        private _LoginService:LoginService) {

    }

    ngOnInit(): void {
        this.isWaiting=true;
        TokenParams.secureStorage.get({
            key: "username"
          }).then(value => {

            this.mUserName=value;
            this._LoginService.ApprovedRequest(this.mUserName).subscribe(
                (response)=>{
                        this.pendings=response
                        this.isWaiting=false
                }
            )

          }, (err) => {
           alert(err);
          });


    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }


    ViewPDF(TransactionID:number){
        this.isWaiting=true;
        this.routerExt.navigate(["/viewdocument",TransactionID],{ clearHistory: false });
         this.isWaiting=false;

    }
}
