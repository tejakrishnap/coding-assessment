import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { ITodo } from "@app/todos/interfaces";
import { TodosService } from "@app/todos/services/todos.service";
import { editTodo, updateTodo } from "@app/todos/state/todo.actions";
import { allTodos, getCurrentTypeTodos } from "@app/todos/state/todo.selectors";
import { Store } from "@ngrx/store";
import { Observable, of, Subscription } from "rxjs";

@Component({
  selector: "app-todos-list",
  styleUrls: ["./todo-list.component.scss"],
  templateUrl: "./todo-list.component.html",
})
export class TodosListComponent {
  todos$: Observable<ITodo[]>;
  emptyTodos = true;
  @Output() updateTodo: EventEmitter<ITodo> = new EventEmitter();
  editingTodo: ITodo;
  editing: boolean;
  subscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private todosService: TodosService,
    private store: Store
  ) {
    this.todos$ = this.store.select(getCurrentTypeTodos);
  }

  ngOnInit(): void {
    this.subscription = this.todosService.allTodos$.subscribe((todos) => {
      this.emptyTodos = todos && todos.length > 0;
      this.changeDetectorRef.markForCheck();
    });
  }

  onEditTodo(todo: ITodo) {
    this.editingTodo = todo;
    this.store.dispatch(editTodo({ index: todo.id }));
  }

  onUpdateTodo(todo: ITodo) {
    this.editing = false;
    this.todosService.updateTodo(todo.id, todo.text);
    // this.store.dispatch(updateTodo({ index: todo.id, text: todo.text }));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
