import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoryInfoPage } from './repository-info.page';

const routes: Routes = [
  {
    path: '',
    component: RepositoryInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepositoryInfoPageRoutingModule {}
