import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { CompleteAllComponent } from "./components/complete-all/complete-all.component";
import { TodosListComponent } from "./components/todo-list/todo-list.component";
import { TodosService } from "./services/todos.service";
import { todosReducer } from "./state/todos.reducer";
import { TodoStartComponent } from "./components/todo-start/todo-start.component";
import { TodoInputComponent } from "./components/todo-input/todo-input.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { Routes, RouterModule } from "@angular/router";
import { ActiveTodosComponent } from "./components/active-todos/active-todos.component";
import { CompletedTodosComponent } from "./components/completed-todos/completed-todos.component";

const DECLARATIONS = [
  CompleteAllComponent,
  TodosListComponent,
  TodoStartComponent,
  TodoInputComponent,
  TodoItemComponent,
  FooterComponent,
  ActiveTodosComponent,
  CompletedTodosComponent,
];

const routes: Routes = [
  { path: "", component: TodoStartComponent },
  { path: "active", component: TodoStartComponent },
  { path: "completed", component: TodoStartComponent },
];

@NgModule({
  declarations: [
    ...DECLARATIONS,
    TodoStartComponent,
    TodoInputComponent,
    FooterComponent,
    TodoItemComponent,
    ActiveTodosComponent,
    CompletedTodosComponent,
  ],
  exports: [...DECLARATIONS, RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("todos", todosReducer),
    RouterModule.forRoot(routes),
  ],
  providers: [TodosService],
})
export class TodosModule {}
