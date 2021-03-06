import { Component, OnInit} from "@angular/core";
import {RouterExtensions} from "@nativescript/angular/router";
import { ActivatedRoute, Router } from "@angular/router";

import { LoginService } from "../Login/login.service";

import { PDFView } from 'nativescript-pdf-view';
import { registerElement } from 'nativescript-angular';
registerElement('PDFView', () => PDFView);


@Component({
    selector: "ns-details",
    templateUrl: "./viewdocument.component.html",
    styleUrls: ['viewdocument.component.css']


})
export class ViewDocumentComponent implements OnInit{
    pdfSrc:string="";
    TransactionID:number;
    Heading :string;
    isWaiting:boolean=false;

    constructor(
        private route: ActivatedRoute,private router:Router,
        private routerExt:RouterExtensions){

   }

    ngOnInit():void{
        this.isWaiting=true;
        this.TransactionID = +this.route.snapshot.params.id;
        this.Heading="FRM120-TRN" + this.TransactionID;

        this.pdfSrc="http://portal.ajes.ae/eformservices/api/LeaveRequest/ReturnLeaveRequest?RecordID=" + this.TransactionID;

    }


      goBack(){

        this.routerExt.back();
    }
    onLoad(){
        this.isWaiting=false;
    }

}
