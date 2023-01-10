import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepositoryInfoPageRoutingModule } from './repository-info-routing.module';

import { RepositoryInfoPage } from './repository-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepositoryInfoPageRoutingModule
  ],
  declarations: [RepositoryInfoPage]
})
export class RepositoryInfoPageModule {}
