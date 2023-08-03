export class Task {
  constructor(
    public id: string,
    public selected: boolean,
    public name: string,
    public date: Date
  ) {
  }
}

export class ListTask {
  constructor(
    public groupName: string,
    public tasks: Task[]
  ) {
  }

}
