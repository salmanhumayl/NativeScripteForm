import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { RequestInProgressComponent } from "./RequestInProgress.component";

const routes: Routes = [
    { path: "", component: RequestInProgressComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class RequestInProgressRoutingModule { }
