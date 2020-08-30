import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ViewDocumentComponent } from "./viewdocument.component";

const routes: Routes = [
    { path: "", component: ViewDocumentComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ViewDocumentRoutingModule { }
