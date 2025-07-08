import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ToolDetailComponent } from './pages/tool-detail/tool-detail.component';
import { ToolCardComponent } from './components/tool-card/tool-card.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { DrawComponent } from './pages/draw/draw.component';
import { PersonalityQuizComponent } from './pages/personality-quiz/personality-quiz.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolDetailComponent,
    ToolCardComponent,
    HeaderComponent,
    FooterComponent,
    SplashScreenComponent,
    AdminPanelComponent,
    DrawComponent,
    PersonalityQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
