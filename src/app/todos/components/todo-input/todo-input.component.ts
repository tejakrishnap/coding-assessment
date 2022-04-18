import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-todo-input",
  templateUrl: "./todo-input.component.html",
  styleUrls: ["./todo-input.component.scss"],
})
export class TodoInputComponent implements OnInit {
  todoInput: FormControl;
  @Output() saveTodo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.todoInput = new FormControl("", [Validators.required]);
  }

  ngOnInit(): void {}

  addTodo() {
    if (this.todoInput.valid) {
      const text: string = this.todoInput.value;
      this.todoInput.setValue("", { emitEvent: false });
      this.saveTodo.emit(text);
    }
  }
}
