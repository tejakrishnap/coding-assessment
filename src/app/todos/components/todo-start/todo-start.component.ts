import { Component, OnInit } from "@angular/core";
import { ITodo } from "@app/todos/interfaces";
import { TodosService } from "@app/todos/services/todos.service";
import { addTodo, addTodoRequest } from "@app/todos/state/todo.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-todo-start",
  templateUrl: "./todo-start.component.html",
  styleUrls: ["./todo-start.component.scss"],
})
export class TodoStartComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  ngOnInit(): void {}

  onSaveTodo(text: string) {
    this.todosService.addTodo(text);
  }
}
