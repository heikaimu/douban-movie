import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HashLocationStrategy , LocationStrategy} from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '../server/httpServer';
import { Storage } from '../server/storage';
import { Scroll } from '../server/scroll';
import { Store } from '../server/store';

import { MainComponent } from './common/main/main.component';
import { AppComponent } from './app.component';
import { WebHeaderComponent } from './common/web-header/web-header.component';
import { SlideNavComponent } from './common/slide-nav/slide-nav.component';
import { LoginComponent } from './page/login/login.component';
import { TableComponent } from './page/movie/movie.component';
import { MovieDetailsComponent } from './page/movie-details/movie-details.component';
import { MovieIntroduceComponent } from './page/movie-introduce/movie-introduce.component';
import { CardListComponent } from './common/card-list/card-list.component';
import { CastIntroduceComponent } from './page/cast-introduce/cast-introduce.component';
import { WelcomeComponent } from './page/welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WebHeaderComponent,
    SlideNavComponent,
    LoginComponent,
    TableComponent,
    MovieDetailsComponent,
    MovieIntroduceComponent,
    CardListComponent,
    CastIntroduceComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    appRoutes,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [
    HTTP,
    Storage,
    Scroll,
    Store,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
