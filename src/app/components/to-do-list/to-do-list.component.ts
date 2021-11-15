import { Component, OnInit } from '@angular/core';
import { Todo, ToDoService } from '../../services/to-do.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  constructor(
    private toDoService:ToDoService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  getTodos(){
    return this.toDoService.getTodoList();
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
