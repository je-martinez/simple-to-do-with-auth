import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo, ToDoService } from '../../services/to-do.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-to-do-create',
  templateUrl: './to-do-create.component.html',
  styleUrls: ['./to-do-create.component.scss']
})
export class ToDoCreateComponent implements OnInit {

  todoForm:FormGroup;
  id:number = null;

  constructor(
    private fb:FormBuilder,
    private toDoService:ToDoService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  get formValue(){
    return this.todoForm.value as Todo;
  }

  initForm(){
    this.todoForm = this.fb.group({
      id:[null],
      name:[null, Validators.required],
      status:[null, Validators.required]
    })
  }

  getParams(){
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.initForm();
    this.getParams();
    this.id ? this.findById():''
  }

  findById(){
    const todo = this.toDoService.findById(this.id);
    this.todoForm.patchValue(todo);
  }

  createTodo(){
    !this.id ? this.toDoService.createTodo(this.formValue)
    :this.toDoService.updateTodo(this.formValue);
    this.router.navigate(['todo-list']);
  }

}
