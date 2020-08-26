import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError  } from "rxjs";
import { catchError,map  } from "rxjs/operators";


import{LoginViewModel} from "../models/login/LoginViewModel"
import{PendingApproval} from "../models/Dashboard/PendingApproval"
import { LeaveRequest } from "../models/LeaveRequest/LeaveRequest";
import {SubmitForApprovalViewModel} from '../models/LeaveRequest/SubmitForApprovalViewModel';
import { EmployeeDetail } from "../models/login/EmployeeDetail";
import { UserDetail } from "../models/UserDetail";

import { LogHistoryModel } from "../models/LogHistoryModel";



@Injectable(

)

export class LoginService {
    private serverUrl = "http://portal.ajes.ae/eFormServices";

    constructor(private http: HttpClient) { }




    getData() {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers });
    }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "AuthKey": "my-key",
            "AuthToken": "my-token",
            "Content-Type": "application/json",
         });

        return headers;
    }

     Verify(model:LoginViewModel):Observable<EmployeeDetail>{
        return this.http.post<EmployeeDetail>(this.serverUrl + '/api/Login/VerifyUser',model)
        .pipe(
                catchError(this.handleError)
            );

    }

    private handleError(errorResponse:HttpErrorResponse)
    {/*
        if(errorResponse.error instanceof ErrorEvent){
            alert("client side error" + errorResponse.error.message)
        }else{
            alert("server side error" + errorResponse)
        } */

            return throwError(errorResponse.error.message);
    }

    PendingApproval(UserName:string):Observable<PendingApproval[]>
    {
       // alert(UserName);
        //return this.http.get<PendingApproval[]>(this.serverUrl +'/api/Dashboard/PendingApproval?UserName='+ UserName);

        return this.http.get<PendingApproval[]>(`${this.serverUrl +'/api/Dashboard/PendingApproval?UserName='}${UserName}`);


    }

    RequestInProgress(UserName:string):Observable<PendingApproval[]>
    {
       // alert(UserName);
        //return this.http.get<PendingApproval[]>(this.serverUrl +'/api/Dashboard/PendingApproval?UserName='+ UserName);

        return this.http.get<PendingApproval[]>(`${this.serverUrl +'/api/Dashboard/RequestInProgress?UserName='}${UserName}`);


    }


    ViewLeaveRequest(TransactionID:Number):Observable<LeaveRequest>{
        return  this.http.get<LeaveRequest>(this.serverUrl + '/api/LeaveRequest/ViewRequest?TransactionID=' + TransactionID);

    }

    WorkLogHistory(RecordId:number,DocID:Number):Observable<LogHistoryModel[]>{
        return this.http.get<LogHistoryModel[]>(this.serverUrl + '/api/LeaveRequest/GetLogHistory?ID=' + RecordId+'&Doc_Code='+DocID);

    }


    GetNextLevelAuthority(DocID:Number,Status:number){
        let valueItems=[];

       return this.http.get<UserDetail[]>(this.serverUrl + '/api/LeaveRequest/GetNextLevelAuthority?DocID=' + DocID+'&Status='+Status)
        .pipe(map(data=>{
            if (data!=null){

            data.forEach(cs => {
                valueItems.push({
                    "value":cs.LoginName,
                    "display":cs.DisplayText
                })

            });
        }
        else
            {

                valueItems.push({
                    "value":'',
                    "display":'END'
                })
            }
            return valueItems;

        })

        )}



    SubmitForApproval(TransactionID:number,ProcessBy:string,SubmitTo:string,CurrentStatus:number,NextLevel:number):Observable<String>
    {
        let approvalmodel=new SubmitForApprovalViewModel();

        approvalmodel.TransactionID=TransactionID;
        approvalmodel.CurrentLevel=NextLevel
        approvalmodel.SeqNo=CurrentStatus
        approvalmodel.SubmitTo=SubmitTo;
        approvalmodel.ProcessBy=ProcessBy

        return this.http.post<string>(this.serverUrl + '/api/LeaveRequest/SubmitForApproval',approvalmodel);


    }

    SubmitLeave(model:LeaveRequest):Observable<string>{

        return this.http.post<string>(this.serverUrl + '/api/LeaveRequest/SaveLeave',model)
        .pipe(
                catchError(this.handleError)
             );

    }


}
