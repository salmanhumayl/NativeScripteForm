import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ViewDocumentRoutingModule } from "./viewdocument-routing.module";
import { ViewDocumentComponent } from "./viewdocument.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ViewDocumentRoutingModule
    ],
    declarations: [
        ViewDocumentComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewDocumentModule { }
