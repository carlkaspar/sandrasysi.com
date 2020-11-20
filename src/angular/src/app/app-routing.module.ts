import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DigitalComponent} from "./components/digital/digital.component";
import {AnalogueComponent} from "./components/analogue/analogue.component";
import {AboutComponent} from "./components/about/about.component";
import {ContactComponent} from "./components/contact/contact.component";
import {LoginComponent} from "./authentication/login/login.component";

const routes: Routes = [
  { path: "digitaal", component: DigitalComponent },
  { path: "analoog", component: AnalogueComponent },
  { path: "minust", component: AboutComponent },
  { path: "kontakt", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "digitaal", pathMatch: "full" },
  { path: "**", redirectTo: "digitaal", pathMatch: "full" }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
