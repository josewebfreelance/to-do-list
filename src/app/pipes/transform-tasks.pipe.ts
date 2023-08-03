import {Pipe, PipeTransform} from '@angular/core';
import {ListTask, Task} from "../models/task";

@Pipe({
  name: 'transformTasks'
})
export class TransformTasksPipe implements PipeTransform {

  transform(list: Task[]): ListTask[] {
    let currentDate: any = null;
    const finalList: ListTask[] = [];

    let groupName: any = null;
    let tasks: any[] = [];

    const newDate = new Date();

    const getOnlyDate = (date: Date) => new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

    const validateFinalList = (): void => {
      finalList.push({groupName, tasks});
      currentDate = null;

      groupName = '';
      tasks = [];
    }

    const validCurrentDate = (item: Task): any => {
      const {date} = item;
      const dateItem = getOnlyDate(date);
      const currentDateItem = getOnlyDate(newDate);

      if (dateItem.getTime() === (currentDateItem.getTime())) {
        return 'Hoy';
      } else {
        return dateItem;
      }
    };

    list.forEach((item: Task, index: number): void => {
      if (currentDate && currentDate !== getOnlyDate(item.date).getTime()) {
        validateFinalList();
      }

      if (currentDate === getOnlyDate(item.date).getTime()) {
        groupName = validCurrentDate(item);
        tasks.push(item);
      }

      if (!currentDate) {
        groupName = validCurrentDate(item);
        tasks.push(item);
      }

      currentDate = getOnlyDate(item.date).getTime();

      if (currentDate && list.length === (index + 1)) {
        validateFinalList();
      }
    });

    return finalList;
  }

}
