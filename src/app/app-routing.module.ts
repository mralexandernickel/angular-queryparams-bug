import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReproductionComponent } from './reproduction/reproduction.component';

const routes: Routes = [
  {
    path: '',
    component: ReproductionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
