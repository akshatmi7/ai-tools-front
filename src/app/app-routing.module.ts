import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ToolDetailComponent } from './pages/tool-detail/tool-detail.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { DrawComponent } from './pages/draw/draw.component';
import { PersonalityQuizComponent } from './pages/personality-quiz/personality-quiz.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tool/:id', component: ToolDetailComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'draw', component: DrawComponent },
  {path: 'personality-quiz', component: PersonalityQuizComponent},
 // ✅ should be above wildcard
  { path: '**', redirectTo: '' },                    // ✅ keep this LAST
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
