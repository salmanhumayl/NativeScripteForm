import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import{NativeScriptFormsModule } from 'nativescript-angular/forms';

import { DropDownModule  } from "nativescript-drop-down/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppGlobals } from '../app.global';


@NgModule({
    providers: [AppGlobals],
    bootstrap: [

        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        DropDownModule
    ],
    declarations: [
        AppComponent


    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
