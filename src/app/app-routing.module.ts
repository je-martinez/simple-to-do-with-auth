import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ToDoCreateComponent } from './components/to-do-create/to-do-create.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'login',
        component:LoginComponent,
        canActivate:[LoginGuard]
      },
      {
        path:'todo-create',
        component:ToDoCreateComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'todo-edit/:id',
        component:ToDoCreateComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'todo-list',
        component:ToDoListComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'**',
        redirectTo:'login'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoginGuard]
})
export class AppRoutingModule { }
