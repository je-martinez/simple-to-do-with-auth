import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Todo{
  id:        number;
  name:      string;
  status:    boolean;
}

export interface TodoResponseAPI {
  userId:    number;
  id:        number;
  title:     string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private todoList:Todo[] = [
    {id:1, name:'First Todo', status:true}
  ]
  private readonly API_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos'

  constructor(
    private http:HttpClient
  ) { }

  private generateTodoId(){
    return (this.todoList?.length == null || this.todoList?.length == undefined ? 0:this.todoList?.length)+1;
  }

  getTodoListFromAPI(){
    return this.http.get<TodoResponseAPI[]>(this.API_ENDPOINT);
  }

  findById(id:number){
    return this.todoList.find(item => item?.id == id);
  }

  createTodo(newTodo:Todo){
    newTodo.id = this.generateTodoId();
    console.log(newTodo)
    this.todoList?.push({...newTodo});
  }

  updateTodo(todoToModify:Todo){
    const todo = this.todoList?.find(item => item?.id == todoToModify.id);
    if(todo){
      todo.name = todoToModify.name;
      todo.status = todoToModify.status;
    }else{
      console.error("Todo doesn't exist!");
    }
  }

  deleteTodo(id:number){
    const index = this.todoList?.findIndex(item => item?.id == id);
    this.todoList.splice(index, 1);
  }

  getTodoList(){
    return this.todoList;
  }


}
