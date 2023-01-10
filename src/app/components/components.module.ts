import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoryComponent } from './repository/repository.component';
import { IonicModule } from '@ionic/angular';
import { NewRepositoryComponent } from './new-repository/new-repository.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RepositoriesComponent, RepositoryComponent, NewRepositoryComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule ],
  exports: [RepositoriesComponent, RepositoryComponent, NewRepositoryComponent],
})
export class ComponentsModule {}
