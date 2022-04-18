export interface ITodo {
  id?: number;
  text: string;
  completed?: boolean;
}

export enum FilterType {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}
