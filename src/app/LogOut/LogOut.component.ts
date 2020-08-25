import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {RouterExtensions} from "@nativescript/angular/router";


import * as dialogs from "tns-core-modules/ui/dialogs";


import {TokenParams} from "../models/TokenParams";

import { AppGlobals } from '../../app.global';


@Component({
    selector: "loginout",
    template: ` <h1>LOGOUT</h1>`
 })

 export class LogoutComponent implements OnInit{

    constructor(private _global: AppGlobals,private routerExtensions: RouterExtensions){

    }

    ngOnInit(): void {

        dialogs.confirm({
            title: "AJES-eForm",
            message: "are you sure you want to logout?",
            okButtonText: "Yes",
            cancelButtonText: "No"

        }).then((result) => {
            if(result==true)
                {
                    this.logout();
                }
                else{
                    this.routerExtensions.back();
                }
        });

    }

    logout(){

        TokenParams.secureStorage.removeAll();
        this._global.isvalid=false;
        this.routerExtensions.navigate(["/login"], { clearHistory: true });

    }

 }
