import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InjectionToken, NgModule } from "@angular/core";
import { CoreModule } from "./core/core.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppRootComponent } from "./app-root/app-root.component";
import { environment } from "environments/environment";

export const API_URL = new InjectionToken('API_URL');

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,

  ],
  providers: [
    { 
      provide: API_URL,
      useValue: environment.apiUrl
    }
  ],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent]
})
export class MainModule {}
