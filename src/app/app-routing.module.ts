import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: () => import("~/app/login/login.module").then((m) => m.LoginModule) },
    { path: "logout", loadChildren: () => import("~/app/logOut/LogOut.module").then((m) => m.LogoutModule) },
    { path: "pendings", loadChildren: () => import("~/app/PendingItems/item.module").then((m) => m.PendingItemModule) },

    { path: "reqinprogess", loadChildren: () => import("~/app/RequestInProgress/RequestInProgress.module").then((m) => m.RequestInProgressModule) },

    { path: "newleaveSO", loadChildren: () => import("~/app/LeaveRequest/NewLeaveRequest.module").then((m) => m.NewLeaveRequestModule) },
    { path: "viewleaveSO/:id/:Mode", loadChildren: () => import("~/app/ViewLeaveRequest/ViewLeaveRequest.module").then((m) => m.ViewLeaveRequestModule) },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
    { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then((m) => m.FeaturedModule) },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) },
    { path: "approvedrequest", loadChildren: () => import("~/app/ApprovedRequests/ApprovedRequests.module").then((m) => m.ApprovedRequestsModule)},
    { path: "viewdocument/:id", loadChildren: () => import("~/app/ViewDocuments/viewdocument.module").then((m) => m.ViewDocumentModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
