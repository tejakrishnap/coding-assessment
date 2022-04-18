import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { environment } from "@app/environments/environment";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TodosModule } from "./todos/todos.module";
import { Routes, PreloadAllModules, RouterModule } from "@angular/router";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { RouteSerializer } from "./todos/route-reducers/route-serializer";
import { reducers } from "./todos/route-reducers";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./todos/todos.module").then((m) => m.TodosModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: RouteSerializer,
    }),
    ReactiveFormsModule,
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 25,
        })
      : [],
    TodosModule,
  ],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
