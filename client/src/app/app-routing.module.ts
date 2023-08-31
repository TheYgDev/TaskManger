import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { LoginHomeComponent } from './components/user/login-home/login-home.component';
import { LoginPageComponent } from './components/user/login-page/login-page.component';
import { RegisterPageComponent } from './components/user/register-page/register-page.component';
import { isLoggedGuard } from './guards/is-logged.guard';
import { TaskListComponent } from './components/Tasks/task-list/task-list.component';
import { NewTaskComponent } from './components/Tasks/new-task/new-task.component';
import { UpdateTaskComponent } from './components/Tasks/update-task/update-task.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [isLoggedGuard] },
  { path: 'tasks', component: TaskListComponent, canActivate: [isLoggedGuard] },
  { path: 'new/task', component: NewTaskComponent, canActivate: [isLoggedGuard] },
  { path: 'updateTask/:id', component: UpdateTaskComponent, canActivate: [isLoggedGuard] },
  {
    path: 'login',
    component: LoginHomeComponent,
    children: [
      { path: 'loginForm', component: LoginPageComponent },
      {path: 'registerForm',component: RegisterPageComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
