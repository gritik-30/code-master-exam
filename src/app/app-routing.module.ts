import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { TestComponent } from './test/test.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login/:id', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'test', component: TestComponent },
  { path: 'report', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
