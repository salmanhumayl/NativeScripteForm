import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ViewLeaveRequestComponent } from "./ViewLeaveRequest.component";

const routes: Routes = [
    { path: "", component: ViewLeaveRequestComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ViewLeaveRequestRoutingModule { }
