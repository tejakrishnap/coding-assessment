import { Component, OnInit } from "@angular/core";
import { FILTER_MODES } from "@app/todos/constants/filter-modes";
import { TodosService } from "@app/todos/services/todos.service";
import {
  getCurrentFilter,
  getTodoCount,
} from "@app/todos/state/todo.selectors";
import { ITodosState } from "@app/todos/state/todos.reducer";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  count$: Observable<number>;
  currentfilter$: Observable<string>;

  constructor(
    private store: Store<ITodosState>,
    private todosService: TodosService
  ) {
    this.count$ = this.store.pipe(select(getTodoCount));
    this.currentfilter$ = this.store.pipe(select(getCurrentFilter));
  }

  ngOnInit(): void {}

  filterClicked(filter: FILTER_MODES) {
    this.todosService.changeFilterMode(filter);
  }
  clearCompletedTodos() {
    this.todosService.clearCompleted();
  }
}
