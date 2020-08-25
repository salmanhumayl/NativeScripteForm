import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NewLeaveRequestRoutingModule } from "./NewLeaveRequest-routing.module";
import { NewLeaveRequestComponent } from "./NewLeaveRequest.component";
import{NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NewLeaveRequestRoutingModule
    ],
    declarations: [
        NewLeaveRequestComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NewLeaveRequestModule { }
