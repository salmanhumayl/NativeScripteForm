import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ValueList } from "nativescript-drop-down";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

/* import { RadSideDrawer } from "nativescript-ui-sidedrawer"; */
import * as app from "tns-core-modules/application";



import {RouterExtensions} from "@nativescript/angular/router";
import { confirm,prompt, PromptResult, PromptOptions, inputType, capitalizationType } from "tns-core-modules/ui/dialogs";

import { LoginService } from "../Login/login.service";
import{LeaveRequest} from "../models/LeaveRequest/LeaveRequest";
import { ValueString } from "../models/valuestring";
import { UserDetail } from "../models/UserDetail";
import { mergeMap } from "rxjs/operators";
import {TokenParams} from "../models/TokenParams";
import { LogHistoryModel } from "../models/LogHistoryModel";

@Component({
    selector: "ns-details",
    templateUrl: "./ViewLeaveRequest.component.html",
    styleUrls: ['./ViewLeaveRequest.component.css'],
    providers:[LoginService]
})

export class ViewLeaveRequestComponent{

    //item: Item;
    RefNo:string;
    model:LeaveRequest=new LeaveRequest();
    TransactionID:number;
    isLoading:boolean=false;
    data:UserDetail[];
    LogHistory:LogHistoryModel[];
    valueItems = [];
    defaultIndex:number;
    SubmitTo:number;
    mUserName:string;
    lvalid:boolean=true;
    title:string;
    strMode:string;

    ApproverSource:ValueList<string>;

    @ViewChild('dd', { read: ElementRef, static: true }) dd: ElementRef;

    constructor(
        private route: ActivatedRoute,private router:Router,
        private routerExt:RouterExtensions,
        private _LoginService:LoginService


    ) {}

    ngOnInit(): void {

        TokenParams.secureStorage.get({
            key: "username"
          }).then(value => {

            this.mUserName=value;
          });

        this.TransactionID = +this.route.snapshot.params.id;
        this.strMode=this.route.snapshot.params.Mode;
          if (this.strMode=="E")
          {
            this.title="Submit To";
          }
        this._LoginService.ViewLeaveRequest(this.TransactionID).subscribe(
            (response)=>{
                this.RefNo="FRM120-TRN" + this.TransactionID;
                  this.model.ID=this.TransactionID;
                   this.model.EmployeesName=response.EmployeesName;
                   this.model.EmpNo=response.EmpNo;
                   this.model.Dept=response.Dept;
                   this.model.LeaveFrom=response.LeaveFrom;
                   this.model.UntilDay=response.UntilDay;
                   this.model.LastDay=response.LastDay;
                   this.model.ExpectedDay=response.ExpectedDay;
                   this.model.Project=response.Project;
                   this.model.AddressLeave=response.AddressLeave;
                   this.model.FromDate=response.FromDate;
                   this.model.ToDate=response.ToDate
                   this.model.Traveldetail=response.Traveldetail
                   this.model.strTicketRequired=response.strTicketRequired;
                   this.model.strCompanyTicket=response.strCompanyTicket
                   this.model.LeaveType=response.LeaveType;
                   this.model.totalDays=response.totalDays;
                   this.model.Status=response.Status;//Current Status
                   this.model.NextLevel=response.NextLevel
                   //mergeMap


                   this._LoginService.GetNextLevelAuthority(120,this.model.Status).subscribe(
                   (result)=>{

                        let myjason=JSON.parse(JSON.stringify(result));
                        this.ApproverSource = new ValueList<string>(result);
                        this.dd.nativeElement.items=this.ApproverSource;
                        this.defaultIndex= this.ApproverSource.getIndex(myjason[0].value);

                   })  //subscript
                   //Work Flow History
                   this._LoginService.WorkLogHistory(this.model.ID,120).subscribe(
                    (result)=>{
                            this.LogHistory=result;

                    })  //subscript



            }
        )

    }


    public onchangeSubmitTo(args: SelectedIndexChangedEventData) {

        this.SubmitTo=args.newIndex;


    }

    goBack(){

        this.routerExt.back();
    }
    submit(){



            // >> confirm-dialog-code
            let options = {
                title: "eForm",
                message: "Are you sure you want to  Approve",
                okButtonText: "Yes",
                cancelButtonText: "No"
            };

            confirm(options).then((result: boolean) => {
              if (result==true)
              {
              this.isLoading=true;
              //Update Status....

              if (this.SubmitTo > -1 ) //means  approver selected
                {
                    this.model.SubmitTo=this.ApproverSource.getValue(this.SubmitTo);

                }
                else
                {

                    this.model.SubmitTo=this.ApproverSource.getValue(this.defaultIndex);

                }



                this._LoginService.SubmitForApproval(this.model.ID, this.mUserName,this.model.SubmitTo,this.model.Status,this.model.NextLevel).subscribe(
                        (response)=>
                        {
                            this.routerExt.navigate(["/pendings"]);
                            this.isLoading=false;

                        }

                   )

                    }
            });
    }

    Reject(){

        let options: PromptOptions = {
            title: "eForm",
            defaultText: " ",
            message: "Remarks",
            okButtonText: "OK",
            cancelButtonText: "Cancel",
            cancelable: true,
            inputType: inputType.text, // email, number, text, password, or email
            capitalizationType: capitalizationType.sentences // all. none, sentences or words
        };
       prompt(options).then((result: PromptResult) => {
        this.routerExt.navigate(["/item"]);
        });
    }


}


