import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { RequestInProgressRoutingModule } from "./RequestInProgress-routing.module";
import { RequestInProgressComponent } from "./RequestInProgress.component";

 import{NativeScriptFormsModule } from 'nativescript-angular/forms';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        RequestInProgressRoutingModule
    ],
    declarations: [
        RequestInProgressComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RequestInProgressModule { }
