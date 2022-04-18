import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { removeTodo, toggleCompleted } from "@app/todos/state/todo.actions";
import { ITodo } from "@app/todos/interfaces";
import { FormControl, Validators } from "@angular/forms";
import { TodosService } from "@app/todos/services/todos.service";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"],
})
export class TodoItemComponent implements OnInit {
  editField: FormControl;
  @Input() todo: ITodo;
  @Input() editing: boolean;
  @Output() editTodo: EventEmitter<ITodo> = new EventEmitter();
  @Output() updateTodo: EventEmitter<ITodo> = new EventEmitter();
  constructor(private todosService: TodosService) {
    this.editField = new FormControl("", [Validators.required]);
  }

  ngOnInit(): void {}

  removeTodo(id: number) {
    this.todosService.removeTodo(id);
  }

  isChecked(todo: ITodo) {
    this.todosService.toggleComplete(todo.id);
  }

  editMode(todo: ITodo) {
    this.editTodo.emit(todo);
  }

  updateText(todo: ITodo) {
    if (this.editField.valid && this.editing) {
      const update = {
        ...todo,
        text: this.editField.value,
      };
      this.updateTodo.emit(update);
    }
  }
}
