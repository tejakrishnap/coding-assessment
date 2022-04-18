import { Component, OnInit } from "@angular/core";
import { TodosService } from "@app/todos/services/todos.service";

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
