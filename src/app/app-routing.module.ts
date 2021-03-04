import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'goal',
    loadChildren: () => import('./page/goal/goal.module').then( m => m.GoalPageModule)
  },
  {
    path: 'goal-detail',
    loadChildren: () => import('./page/goal-detail/goal-detail.module').then( m => m.GoalDetailPageModule)
  },
  {
    path: 'rule',
    loadChildren: () => import('./page/rule/rule.module').then( m => m.RulePageModule)
  },
  {
    path: 'simulation',
    loadChildren: () => import('./page/simulation/simulation.module').then( m => m.SimulationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
