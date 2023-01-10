import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewRepositoryComponent } from '../../components/new-repository/new-repository.component';
import { RepositoryService } from '../../services/repository.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private modalCtrl: ModalController,
    private repositoryService: RepositoryService
  ) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: NewRepositoryComponent,
    });
    modal.present();
    modal.onDidDismiss().then((data) => {

      if (data.data != undefined) {
        this.repositoryService.createRepository(data.data);
      }else{
        this.repositoryService.updateRepository(data.data);
      }
    });
  }
}
