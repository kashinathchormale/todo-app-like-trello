import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { TodoBoardService } from './todo-services/todo-board.service';
import { TodoboardComponent } from './todoboard/todoboard.component';


import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TodoboardComponent,
    CardPopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    RoutingModule
  ],
  providers: [TodoBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
