import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import {RouterExtensions} from "@nativescript/angular/router";

import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { LoginService } from "../Login/login.service";
import{PendingApproval} from "../models/Dashboard/PendingApproval"
import {TokenParams} from "../models/TokenParams";



@Component({
    selector: "RequestInProgress",
    templateUrl: "./RequestInProgress.component.html",
    styleUrls: ['RequestInProgress.component.css'],
    providers:[LoginService]
 })

 export class RequestInProgressComponent implements OnInit {
    isWaiting:boolean=false;
    pendings:PendingApproval[];
    mUserName:string;


    constructor(private route: ActivatedRoute,private router:Router,
        private routerExt:RouterExtensions,
        private _LoginService:LoginService,


) { }

    ngOnInit(): void {
        alert("333213");
        this.isWaiting=true;
        TokenParams.secureStorage.get({
            key: "username"
          }).then(value => {

            this.mUserName=value;
            alert(this.mUserName);
            this._LoginService.RequestInProgress(this.mUserName).subscribe(
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
    onItemTap(arg){
        this.isWaiting=true;
        const selectedID=this.pendings[arg.index]; //get object
       this.routerExt.navigate(["/viewleaveSO",selectedID.TransactionID,"V"]);
       this.isWaiting=false;

    }

    showremindar()
    {
        alert("Remindar Sent Successfully.");
    }

}















/* TokenParams.secureStorage.get({
    key:"userinfo"

}).then(obj=>{

    this.mUserName=JSON.parse(obj);
    this.mUserName=obj;

},(err) => {
    alert(err);
  }); */
