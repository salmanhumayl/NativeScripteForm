import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ViewLeaveRequestRoutingModule } from "./ViewLeaveRequest-routing.module";
import { ViewLeaveRequestComponent } from "./ViewLeaveRequest.component";
import{NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ViewLeaveRequestRoutingModule
    ],
    declarations: [
        ViewLeaveRequestComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewLeaveRequestModule { }
