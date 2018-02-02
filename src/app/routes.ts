import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './page/login/login.component';
import { MainComponent } from './common/main/main.component';
import { TableComponent } from './page/movie/movie.component';
import { MovieDetailsComponent } from './page/movie-details/movie-details.component';
import { MovieIntroduceComponent } from './page/movie-introduce/movie-introduce.component';
import { CastIntroduceComponent } from './page/cast-introduce/cast-introduce.component';
import { WelcomeComponent } from './page/welcome/welcome.component';

const ROUTES: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'movie/:type',
        component: TableComponent
      },
      {
        path: 'movieDetails/:id',
        component: MovieDetailsComponent
      },
      {
        path: 'movieIntroduce/:id',
        component: MovieIntroduceComponent
      },
      {
        path: 'castIntroduce/:id',
        component: CastIntroduceComponent
      }
    ]
  }
];

export const appRoutes = RouterModule.forRoot(ROUTES);
