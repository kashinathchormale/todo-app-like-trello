import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; 
import { TodoboardComponent } from "./todoboard/todoboard.component";

const routes: Routes = [{ path: "", component: TodoboardComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class RoutingModule {}