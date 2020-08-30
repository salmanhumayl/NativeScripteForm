import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ApprovedRequestsRoutingModule } from "./ApprovedRequests-routing";
import { ApprovedRequestsComponent } from "./ApprovedRequests.component";

 import{NativeScriptFormsModule } from 'nativescript-angular/forms';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ApprovedRequestsRoutingModule
    ],
    declarations: [
        ApprovedRequestsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ApprovedRequestsModule { }
