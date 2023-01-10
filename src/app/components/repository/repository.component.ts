import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '../../interfaces/repository';
import {
  ActionSheetController,
  Platform,
  ModalController,
} from '@ionic/angular';
import { NewRepositoryComponent } from '../new-repository/new-repository.component';
import { RepositoryService } from '../../services/repository.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit {
  @Input() repository: Repository;
  @Input() index: number = 0;

  constructor(
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
    private repositoryService: RepositoryService,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit() {}

  async openMenu() {
    const articleInFavorite = await this.repositoryService.isFavorite(
      this.repository._id
    );

    const articleCreated = await this.repositoryService.createdByUser(
      this.repository._id
    );

    if (articleCreated) {
      const actionSheet = await this.actionSheetController.create({
        header: 'Options',
        buttons: [
          // {
          //   text: 'Share',
          //   icon: 'share-outline',
          //   handler: () => {
          //     this.onShareArticle();
          //   },
          // },
          {
            text: articleInFavorite
              ? 'Remove from favorites'
              : 'Add to favorites',
            icon: articleInFavorite ? 'heart' : 'heart-outline',
            handler: () => {
              this.onToggleFavorite();
            },
          },
          {
            text: 'Edit Repository',
            icon: 'create-outline',
            handler: () => {
              this.editRepository();
            },
          },

          {
            text: 'Remove Repository',
            icon: 'trash-outline',
            cssClass: 'action-danger',

            handler: () => {
              this.deleteRepository();
            },
          },

          {
            text: 'Cancel',
            icon: 'close-outline',
            role: 'cancel',
          },
        ],
      });
      await actionSheet.present();

    } else {
      const actionSheet = await this.actionSheetController.create({
        header: 'Options',
        buttons: [
          // {
          //   text: 'Share',
          //   icon: 'share-outline',
          //   handler: () => {
          //     this.onShareArticle();
          //   },
          // },
          {
            text: articleInFavorite
              ? 'Remove from favorites'
              : 'Add to favorites',
            icon: articleInFavorite ? 'heart' : 'heart-outline',
            handler: () => {
              this.onToggleFavorite();
            },
          },
          {
            text: 'Cancel',
            icon: 'close-outline',
            role: 'cancel',
          },
        ],
      });
      await actionSheet.present();
    }
  }

  onToggleFavorite() {
    this.repository.saved = !this.repository.saved;
    this.repositoryService.createFavorite(this.repository);
  }

  editRepository() {
    this.modalCtrl
      .create({
        component: NewRepositoryComponent,
        componentProps: {
          repository: this.repository,
        },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        if (role === 'update') {
          this.repository = data;
        }
      });
  }

  deleteRepository() {
    this.repositoryService.deleteRepo(this.repository);
  }

  goToRepository(repository: string) {
    this.router.navigate(['/repository', repository]);
  }
}
