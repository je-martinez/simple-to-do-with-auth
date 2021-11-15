import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo, TodoResponseAPI, ToDoService } from '../../services/to-do.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

enum ListModes{
  FROM_FAKE_SERVICE = 'FROM_FAKE_SERVICE',
  FROM_API = 'FROM_API',
}
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {

  loading:boolean = false;
  todosFakeService:Todo[] = [];
  todosAPI:TodoResponseAPI[] = [];
  mode = ListModes.FROM_FAKE_SERVICE;
  unsubscribe$ = new Subject<void>();

  constructor(
    private toDoService:ToDoService,
    private router:Router
  ) { }

  get isFakeService(){
    return this.mode == ListModes.FROM_FAKE_SERVICE;
  }

  get isAPI(){
    return this.mode == ListModes.FROM_API;
  }

  toogleService(){
    if(this.isFakeService){
      this.mode = ListModes.FROM_API;
      this.getTodosAPI();
    }else if(this.isAPI){
      this.mode = ListModes.FROM_FAKE_SERVICE;
      this.getTodos();
    }
  }

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(){
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }

  getTodos(){
    this.todosFakeService = this.toDoService.getTodoList();
  }

  getTodosAPI(){
    this.loading = true;
    this.toDoService.getTodoListFromAPI().pipe(
      takeUntil(this.unsubscribe$),
      delay(1000)
    ).subscribe(data =>{
      this.todosAPI = data?.splice(0, 5);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }


  editTodo(todo:Todo){
    this.router.navigate([`todo-edit/${todo?.id}`]);
  }

  removeTodo(todo:Todo){
    this.toDoService.deleteTodo(todo?.id);
  }

  navigateToNewTodo(){
    this.router.navigate(['todo-create']);
  }

}
