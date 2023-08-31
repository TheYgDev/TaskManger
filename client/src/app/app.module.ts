import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/user/login-page/login-page.component';
import { RegisterPageComponent } from './components/user/register-page/register-page.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { TaskComponent } from './components/Tasks/task/task.component';
import { isLoggedGuard } from './guards/is-logged.guard';
import { LoginHomeComponent } from './components/user/login-home/login-home.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/pages/about/about.component';
import { TaskListComponent } from './components/Tasks/task-list/task-list.component';
import { NewTaskComponent } from './components/Tasks/new-task/new-task.component';
import { UpdateTaskComponent } from './components/Tasks/update-task/update-task.component';
import { Globals } from 'src/app/globals/globals';
import { EditDropDownComponent } from './components/edit-drop-down/edit-drop-down.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomepageComponent,
    TaskComponent,
    LoginHomeComponent,
    HeaderComponent,
    AboutComponent,
    TaskListComponent,
    NewTaskComponent,
    UpdateTaskComponent,
    EditDropDownComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [isLoggedGuard,Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
