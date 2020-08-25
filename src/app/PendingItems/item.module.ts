import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PendingItemsRoutingModule } from "./item-routing.module";
import { ItemsComponent } from "./item.component";

 import{NativeScriptFormsModule } from 'nativescript-angular/forms';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        PendingItemsRoutingModule
    ],
    declarations: [
        ItemsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PendingItemModule { }
