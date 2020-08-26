import { Component, OnInit,ViewChild, ElementRef } from "@angular/core";

import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { ValueList } from "nativescript-drop-down";


import * as ModalPicker from 'nativescript-modal-datetimepicker';
/* import { ModalDatetimepicker } from "nativescript-modal-datetimepicker"
 */
import{LeaveRequest} from '../models/LeaveRequest/LeaveRequest';

import { LoginService } from "../Login/login.service";
import{LeaveType} from '../models/LeaveRequest/LeaveType';
import {RouterExtensions} from "@nativescript/angular/router";

import { AppGlobals } from '../../app.global';
import {TokenParams} from "../models/TokenParams";

import { TextField } from "tns-core-modules/ui/text-field";

import {Page, EventData} from 'tns-core-modules/ui/page';

import * as dialogs from "tns-core-modules/ui/dialogs";
import { Switch } from "tns-core-modules/ui/switch";

import * as imagepicker from "nativescript-imagepicker";
import * as bgHTTP from  "nativescript-background-http";

import * as fs from "tns-core-modules/file-system";
import {knownFolders,path,Folder,File} from "tns-core-modules/file-system";
import { ImageAsset } from "tns-core-modules/image-asset";
import {ImageSource} from "tns-core-modules/image-source"
import * as bgHttp from "nativescript-background-http";
import { of, timer, interval, BehaviorSubject, Observable } from 'rxjs';


@Component({

    selector: "ns-nleave",
    templateUrl: "./NewLeaveRequest.component.html",
    styleUrls: ['./NewLeaveRequest.component.css'],
    providers:[LoginService]

})

export class NewLeaveRequestComponent implements OnInit{


    event = new BehaviorSubject<any>({});
    currentFileNameBeingUploaded:string;
    tempFilePath:string;
    uploading:string;
    certificate:string;
    isLoading:boolean=false;
    mUserName:string;
    itemSource :ValueList<string>;
    ApproverSource:ValueList<string>;
    ActionBarHeading :string;

    submito:string;

    defaultIndex:number;
    defaultLeaveIndex:number;

    selectedLeave:number;
    selectedApprover:number=-1;

    AddressLeave:string;
    FromDate:string;
    ToDate:string;
    TravelDetail:string;
    Other:string;

    @ViewChild('dd', { read: ElementRef, static: true }) dd: ElementRef;
    @ViewChild('approver', { read: ElementRef, static: true }) approver: ElementRef;


   @ViewChild("TraveDetailToTextField",{static:false}) TraveDetailToTextField: ElementRef;

   @ViewChild("tleavefrom",{static:false}) tleavefrom:ElementRef;
   @ViewChild("tuntillday",{static:false}) tuntillday:ElementRef;
   @ViewChild("lastday",{static:false}) lastday:ElementRef;
   @ViewChild("expectedday",{static:false}) expectedday:ElementRef;


    LeaveFrom:string;
    LeaveTo:string;
    LastDay:string;
    ExpectedDay:string

    LeavedateFrom:Date;
    LeavedateTo:Date;
    dLastDay:Date;
    dExpectedDay:Date;
    strTicketRequired:string="No";
    strCompanyTicket:string="No";
    model:LeaveRequest;
    logDirectory: Folder;

    constructor(private _LoginService:LoginService, private routerExt:RouterExtensions,
        private _global: AppGlobals,private page:Page) {

    }

    ngOnInit():void{

        this.logDirectory = knownFolders.documents().getFolder("logs");
        Array.from(Array(10).keys()).forEach((i) => {
            const logFile = this.logDirectory.getFile(`log_${i}.log`);
            logFile.writeTextSync("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy");
        });



        TokenParams.secureStorage.get({
            key: "username"
          }).then(value => {

            this.mUserName=value;
          }, (err) => {
            alert(err);
           });


        this.ActionBarHeading="Leave Request - " + this._global.EmpCode;

        this.itemSource = new ValueList<string>([
            { value: "AL", display: "Annual Leave" },
            { value: "SL", display: "Sick Leave" },
            { value: "EL", display: "Emergency Leave" },
            { value: "RR", display: "Rest and Recreation" },
            { value: "UPL", display: "Unpaid Leave" },
            { value: "O", display: "Other Leave" },
        ]);
        this.dd.nativeElement.items = this.itemSource;

        //Get List of Approvers and set .......

        this.defaultLeaveIndex= this.itemSource.getIndex("AL")

        this.ApproverSource=new ValueList<string>([
            { value: "109249", display: "Mohammad Salman Mazhar" },
            { value: "86221", display: "Amir Nawaz" },
            { value: "115742", display: "GHAITH KALIFA MOHAMED ALSAWAYA ALNUAIMI" },
            { value: "103573", display: "Ghulam Farid" },
            { value: "82972", display: "Jalib Ahmed Anjukandy Thalakkal" },
            { value: "103826", display: "James Montgomery Young" },
            { value: "91147", display: "Jimmy Pothen James" },
            { value: "80606", display: "Josedas Kizhoor Muttikkal Francis" },
            { value: "58917", display: "Joy Cheruvillil Thomas" },
            { value: "103754", display: "Leodigario Adem Faelden" },
            { value: "80853", display: "Michael Goyea" },
            { value: "116665", display: "Mukul Gangal" },
            { value: "86288", display: "Peer Babu Peer Khan Sulaiman" },
            { value: "86123", display: "Prasad R Narasimhan" },
            { value: "80106", display: "Rawad Fandy Kabboul" },
            { value: "AJC2366", display: "Ronald Metcalf" },
            { value: "57682", display: "Sami Kanaan" },
            { value: "56036", display: "Sherif El Kurdi" },
            { value: "80077", display: "Syed Mohammed Shamsuddin Khadri" },
            { value: "86393", display: "Tomy Johnson Mathew" },
            { value: "100640", display: "Wa`el (Bayer Khaled) Aref (Said Alasa`d)" },


        ]);


       this.approver.nativeElement.items=this.ApproverSource
       this.defaultIndex= this.ApproverSource.getIndex(this._global.ForemanCode)


      /*   this.items = new Array<LeaveType>(
            { Code: "AL", Name: "Annual Leave"},
            { Code: "SL", Name: "Sick Leave"},
            { Code: "EL", Name: "Emergency Leave"},
            { Code: "RR", Name: "Rest and Recreation"},
            { Code: "UPL", Name: "Unpaid Leave"},
            { Code: "O", Name: "Other Leave"} */
        //);


    }



    LeaveFromPickDate() {
        const picker = new ModalPicker.ModalDatetimepicker();
        picker.pickDate({

          title: 'Please enter Leave From',
          theme: 'dark',
          is24HourView: false
        }).then((result) => {

            this.LeaveFrom = result['day'] + '-' + result['month'] + '-' + result['year'];
            this.LeavedateFrom = new Date(result.year, result.month -1, result.day + 1);

        }).catch((error) => {
          alert('Error: ' + error);
        });
      }

      LeaveToPickDate() {
        const picker = new ModalPicker.ModalDatetimepicker();
        picker.pickDate({
          title: 'Please enter Leave From',
          theme: 'dark',
          is24HourView: false
        }).then((result) => {

            this.LeaveTo = result['day'] + '-' + result['month'] + '-' + result['year'];
            this.LeavedateTo = new Date(result.year, result.month - 1, result.day+1);

        }).catch((error) => {
          alert('Error: ' + error);
        });
      }


      LastDayPickDate() {
        const picker = new ModalPicker.ModalDatetimepicker();
        picker.pickDate({
          title: 'Please enter Leave From',
          theme: 'dark',
          is24HourView: false
        }).then((result) => {

            this.LastDay = result['day'] + '-' + result['month'] + '-' + result['year'];
            this.dLastDay = new Date(result.year, result.month - 1, result.day +1);

        }).catch((error) => {
          alert('Error: ' + error);
        });
      }

      ExpectedDayPickDate() {
        const picker = new ModalPicker.ModalDatetimepicker();
        picker.pickDate({
          title: 'Please enter Leave From',
          theme: 'dark',
          is24HourView: false
        }).then((result) => {

            this.ExpectedDay = result['day'] + '-' + result['month'] + '-' + result['year'];
            this.dExpectedDay = new Date(result.year, result.month - 1, result.day +1 );

        }).catch((error) => {
          alert('Error: ' + error);
        });
      }



     public onchange(args: SelectedIndexChangedEventData) {
       // alert(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
       // const selectedID=args.newIndex;
        //alert(selectedID);
        this.selectedLeave=args.newIndex;
       // this.itemSource.getValue(args.newIndex)

    }

    public onchangeSubmitTo(args: SelectedIndexChangedEventData) {

         this.selectedApprover=args.newIndex;


     }




    SaveLeave(){
        dialogs.confirm({
            title: "AJES-eForm",
            message: "are you sure you want to continue?",
            okButtonText: "Yes",
            cancelButtonText: "No"

        }).then((result) => {
            if(result==true)
                this.SubmitLeave();
        });


 }

  SubmitLeave(){
    if (this.LeavedateFrom==null){
        let textField = <TextField>this.tleavefrom.nativeElement;
        textField.focus()
        textField.dismissSoftInput(); //Dimiss the keyboard
        return;
    }
    if (this.LeavedateTo==null){
        let textField = <TextField>this.tuntillday.nativeElement;
        textField.focus()
        textField.dismissSoftInput(); //Dimiss the keyboard
        return;
    }
    if (this.dLastDay==null){
        let textField = <TextField>this.lastday.nativeElement;
        textField.focus()
        textField.dismissSoftInput(); //Dimiss the keyboard
        return;
    }
    if (this.dExpectedDay==null){
        let textField = <TextField>this.expectedday.nativeElement;
        textField.focus()
        textField.dismissSoftInput(); //Dimiss the keyboard
        return;
    }
    if (this.LeavedateTo < this.LeavedateFrom)
    {
        alert("Invalid Leave Period.Check From / To Leave.");
        return;
    }

    if(this.dExpectedDay < this.LeavedateTo)
    {
        alert("Expected day of work cannot be less than UntillDay");
        return;
    }

    if (this.selectedLeave==null)
        {
            alert("Please select Leave Type")
            return false;
    }
        this.isLoading=true;
        this.model=new LeaveRequest();
        this.model.EmpNo=this._global.EmpCode
        this.model.EmployeesName=this._global.EmpName;
        this.model.Nationality=this._global.Nationality;
        this.model.Position=this._global.Position;
        this.model.Dept=this._global.ProjectCode
        this.model.JoiningDate=this._global.JoiningDate;

        this.model.LeaveFrom=this.LeavedateFrom;
        this.model.UntilDay=this.LeavedateTo;
         this.model.LastDay=this.dLastDay;
        this.model.ExpectedDay=this.dExpectedDay;

        this.model.LeaveType=this.itemSource.getValue(this.selectedLeave);
        this.model.AddressLeave=this.AddressLeave;
        this.model.FromDate=this.FromDate;
        this.model.ToDate=this.ToDate;
        this.model.Traveldetail=this.TravelDetail;
        this.model.strTicketRequired=this.strTicketRequired;
        this.model.strCompanyTicket=this.strCompanyTicket;
        this.model.CreatedBy=this.mUserName;
        this.model.EmailAddress=this._global.EmailAddress;
        if (this.selectedApprover > -1 ) //means  approver selected
        {
           this.model.SubmitTo=this.ApproverSource.getValue(this.selectedApprover);

        }
        else
        {

            this.defaultIndex= this.ApproverSource.getIndex(this._global.ForemanCode)
            this.model.SubmitTo=this.ApproverSource.getValue(this.defaultIndex);

        }
        this._LoginService.SubmitLeave(this.model).subscribe(
             (response)=>{

                alert("Leave Submitted Successfully");
                this.isLoading=false;
                this.routerExt.navigate(["/pendings"], { clearHistory: true });
               },
               (error) =>{
                alert(error);
            }
            )


  }

  goBack(){


    this.routerExt.back();
}

onTickerRequiredChange(arg:EventData)
{
    let sw=arg.object as Switch;
    let isChecked=sw.checked;
    if (isChecked!=null)
    {
        if (isChecked)
        {
            this.strTicketRequired="Yes";
        }
    }

}

onCompanyTicketChange(arg:EventData)
{
    let sw=arg.object as Switch;
    let isChecked=sw.checked;
    if (isChecked!=null)
    {
        if (isChecked)
        {
            this.strCompanyTicket="Yes";
        }
    }

}



onSelectIamgeTap()
{
  let context=imagepicker.create({
      mode:'single'
  });
    this.startSelection(context);
}

private startSelection(context) {
    context
        .authorize()
        .then(() => {
            return context.present();
        })
        .then((selection) => {
            this.isLoading=true;
            let imageAsset = selection.length > 0 ? selection[0] : null;

            if (imageAsset) {

                const tempFolderPath=knownFolders.temp().getFolder("nsimagepicker").path;
                this.tempFilePath=path.join(tempFolderPath,`${Date.now()}.jpg`);

                const imagesource=new ImageSource();
                imagesource.fromAsset(imageAsset).then(source =>{
                    const saved=source.saveToFile(this.tempFilePath,"jpeg");
                   this.certificate=this.tempFilePath;
                   this.isLoading=false;
                   //alert(this.tempFilePath);
               }).catch(function (e){
                   alert(e);
               }

               );
                this.getImageFilePath(imageAsset)
            }
        }).catch(function (e) {
            console.log(e);
        });
}


 async getImageFilePath(imageAsset): Promise<void> {

            const session = bgHttp.session("file-upload");

            let file = fs.File.fromPath(this.tempFilePath);


           this.currentFileNameBeingUploaded = file.path.substr(file.path.lastIndexOf("/") + 1);
            const request = {
                description: "AppLoggingUpload",
                headers: {
                    "Content-Type": "application/octet-stream",
                    "File-Name": this.currentFileNameBeingUploaded,
                    "EmployeeCode" :this._global.EmpCode
                },
                method: "POST",
                url: "http://portal.ajes.ae/eFormServices/api/LeaveRequest/UploadSignature"
            };

            const params = [
                { name: "file", filename: file.path, mimeType: "application/images" }
            ];

                   const task: bgHttp.Task = session.multipartUpload(params, request);
                   task.on("progress", this.progressHandler);
                   task.on("error", this.errorHandler);
                   task.on("complete", this.completeHandler);

              //  resolve(imageAsset.android);


    }

private async uploadImage(path: string) {

    const session = bgHttp.session("image-upload");
    let file = fs.File.fromPath(path);
    this.currentFileNameBeingUploaded = file.path.substr(file.path.lastIndexOf("/") + 1);
    const request = {
        description: "AppLoggingUpload",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": this.currentFileNameBeingUploaded
        },
        method: "POST",
        url: "http://portal.ajes.ae/eFormServices/api/LeaveRequest/UploadSignature"
    };

    const params = [
        { name: "file", filename: file.path, mimeType: "application/image" },
        { name: "description", value: "Some additional parameter for description" }
    ];

           const task: bgHttp.Task = session.multipartUpload(params, request);
            task.on("progress",this.progress);
           task.on("error",this.error);
}

private progress  (e)
{
    alert("progress " + e.eventName);
    alert("progress " + e.totalBytes);
    alert("progess " + e.currentBytes);

}


private error  (e)
{
    alert("error " + e.responseCode);
    alert("error " + e.response);

}

private createNewRequest() {

    const request = {
        url: "https://portal.ajes.ae/eFormServices/api/LeaveRequest/UploadSignature",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream"
        },
        description: "uploading file...",
        androidAutoDeleteAfterUpload: false,
        androidNotificationTitle: "NativeScript HTTP background"
    };

    return request;
}

public async upload(): Promise<void> {
    const session = bgHttp.session("app-logging--upload");

    const zipFile = this.logDirectory.getFile(`log_8.log`);

    const request = {
        description: "AppLoggingUpload",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": zipFile.name
        },
        method: "POST",
        url: "http://portal.ajes.ae/eFormServices/api/LeaveRequest/UploadSignature"
    };

    const params = [
        { name: "file", filename: zipFile.path, mimeType: "application/zip" },
        { name: "description", value: "Some additional parameter for description" }
    ];

    console.log("Start Upload to ", request.url);


    const task: bgHttp.Task = session.multipartUpload(params, request);
    task.on("progress", this.progressHandler);
    task.on("error", this.errorHandler);
    task.on("complete", this.completeHandler);
}
private progressHandler(e) {
    this.uploading="uploading " + e.currentBytes + " / " + e.totalBytes;
    //alert("uploading " + e.currentBytes + " / " + e.totalBytes);
}

private errorHandler(e) {
    dialogs.alert("Error " +  e.error.toString() + " code.");
}

private completeHandler(e) {
    this.uploading="Uploaded";

}

}


 // @ViewChild('dd', { static: false }) dd: ElementRef;
 //@ViewChild("TraveDetailToTextField", {  read: ElementRef, static: true }) TraveDetailToTextField: ElementRef;
