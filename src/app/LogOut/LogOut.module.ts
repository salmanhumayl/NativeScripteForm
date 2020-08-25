import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LogOutRoutingModule } from "./LogOut-routing.module";
import { LogoutComponent } from "./LogOut.component";

 import{NativeScriptFormsModule } from 'nativescript-angular/forms';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        LogOutRoutingModule
    ],
    declarations: [
        LogoutComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LogoutModule { }
