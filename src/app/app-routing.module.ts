import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ToolDetailComponent } from './pages/tool-detail/tool-detail.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { DrawComponent } from './pages/draw/draw.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tool/:id', component: ToolDetailComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'draw', component: DrawComponent },
 // ✅ should be above wildcard
  { path: '**', redirectTo: '' },                    // ✅ keep this LAST
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
