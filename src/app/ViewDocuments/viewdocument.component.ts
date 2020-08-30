import { Component, OnInit} from "@angular/core";
import {RouterExtensions} from "@nativescript/angular/router";

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

    constructor(
        private routerExt:RouterExtensions){

   }

    ngOnInit():void{
        this.pdfSrc="http://portal.ajes.ae/eformservices/api/LeaveRequest/ReturnLeaveRequest?RecordID=936";
    }

    public onLoad() {
        alert('Loading PDF!');
      }

      goBack(){

        this.routerExt.back();
    }

}
