import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {RouterExtensions} from "@nativescript/angular/router";

import { LoginService } from "./login.service";

import{LoginViewModel} from "../models/login/LoginViewModel"
import { SecureStorage } from "nativescript-secure-storage";
import {TokenParams} from "../models/TokenParams";
import { EmployeeDetail } from "../models/login/EmployeeDetail";
import { AppGlobals } from '../../app.global';

import {Page, EventData} from 'tns-core-modules/ui/page';
import * as application from "tns-core-modules/platform";


import { PDFView } from 'nativescript-pdf-view';
import { registerElement } from 'nativescript-angular';
registerElement('PDFView', () => PDFView);

import {HandleFile} from 'nativescript-handle-file';

@Component({
   selector: "login",
   templateUrl: "./login.component.html",
   styleUrls: ['login.component.css'],
    providers:[LoginService]
})

export class LoginComponent  implements OnInit {
    handleFile: HandleFile;
    loginmodel:LoginViewModel=new LoginViewModel();
    Username:string="smazhar";
    Password:string="marina123@@";
    pdfSrc:string="";

    retval :boolean;
    isLoading = false;
    error:string;

    constructor(private _LoginService:LoginService,private _router :Router,
         private routerExt:RouterExtensions,private _global: AppGlobals,private page:Page){

    }
    ngOnInit(): void {
        // Init your component properties here.
        this.handleFile = new HandleFile();
        this.page.actionBarHidden=true;


    }


    ValidateUser(){

        this.isLoading = true;
        this.loginmodel.Username=this.Username;
        this.loginmodel.Password=this.Password;
         this._LoginService.Verify(this.loginmodel).subscribe(
            (response)=>{
                if (response.IsValid==true)
                {
                    //alert(application.device.manufacturer);
                    //alert(application.device.model);
                    //alert(application.device.uuid)

                   TokenParams.secureStorage=new SecureStorage
                   TokenParams.secureStorage.set({key:"username",value:this.loginmodel.Username.toLowerCase()});
                   //TokenParams.secureStorage.set({key:"userinfo",value:JSON.stringify(response)});
                    this._global.isvalid=true;
                    this._global.EmpCode=response.EmpCode;
                    this._global.EmpName=response.EmpName;
                    this._global.Position=response.Position;
                    this._global.Nationality=response.Nationality;
                    this._global.Project=response.Project;
                    this._global.EmailAddress=response.EmailAddress;
                    this._global.picturesrc="http://portal.ajes.ae/epro/P"+ response.Mas_Key +".jpg";
                    this._global.ProjectCode=response.ProjectCode;
                    this._global.JoiningDate=response.JoiningDate;
                    this._global.ForemanCode=response.ForemanCode;
                    this.isLoading = false;
                    this.routerExt.navigate(["/pendings"], { clearHistory: true });
                }
                else
                {
                    this.isLoading=false;
                    alert("Invalid Login Credentials....")
                }
            },
            (error) =>{
                this.isLoading=false;
                this.error=error;
                alert(this.error);
            }


        )

    //this._router.navigate(['/items'])

    }

    public onLoad() {
        alert('Loaded PDF!');
      }
      changePDF(){

        this.pdfSrc="http://portal.ajes.ae/eformservices/api/LeaveRequest/ReturnLeaveRequest?RecordID=936";


      }

     checkPdf(event: EventData) {
        alert("CCC");
        this.handleFile.open({
            name: "PDF-example.pdf",
            url: "http://portal.ajes.ae/eformservices/api/LeaveRequest/ReturnLeaveRequest?RecordID=936",
            title: "Teste de download",
            directory: "downloads"
        })
    }


}
