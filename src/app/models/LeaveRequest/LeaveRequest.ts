import { Data } from "@angular/router";

export class LeaveRequest
{
    ID :number;
    Status:number;
    Date:Date;
    EmpNo:string;
    EmployeesName:string;
    Nationality:string;
    Position:string;
    Dept:string;
    Project:string;
    JoiningDate:Date;
    LeaveType:string;
    Other:string;
    AddressLeave:string;
    LeaveFrom:Date;
    UntilDay:Date;
    LastDay:Date;
    ExpectedDay:Date;
    Traveldetail:string;
    FromDate:string;
    ToDate:string;
    TicketRequired:boolean;
    CompanyTicket:boolean;
    strTicketRequired:string;
    strCompanyTicket:string;
    Accept:boolean;
    strAccept:string;
    Evaluation:string;
    SignatureRequired:string;
    CreatedBy:string;
    LeaveCertificateURL:string;
    FileExtention:string;
    SubmitTo:string;
    totalDays:number;
    EmailAddress:string;
    NextLevel:number;

}
