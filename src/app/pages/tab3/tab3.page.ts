import { Repository } from './../../interfaces/repository';
import { Component } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  repositories: Repository[] = [];

  constructor(private repositoryService: RepositoryService, private UserService: UserService) {}

  async ngOnInit() {
    this.getRepositories();

    this.repositoryService.newFavorite.subscribe((repository: Repository) => {
      this.repositories.push(repository);
    });

    this.repositoryService.deleteFavorite.subscribe(
      (repository: Repository) => {
        // if repositor in repositories
        if(this.repositories.find(repo => repo._id === repository._id)) {
          this.repositories = this.repositories.filter(
            (repo) => repo._id !== repository._id
          );
        }
      }
    );

    this.repositoryService.deleteRepository.subscribe(
      (repository: Repository) => {
        this.repositories = this.repositories.filter(
          (repo) => repo._id !== repository._id
        );
      }
    );
  }

  async getRepositories() {
    // this.repositories = [
    //   {
    //     _id: '1',
    //     title: 'Ionic 5',
    //     description:
    //       'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
    //     url: 'https://ionicframework.com/',
    //     tags: [
    //       'RoboBoat',
    //       'RoboSub',
    //       'SDV',
    //       'UAV',
    //       'Tutorial',
    //       'Perception',
    //       'Research',
    //     ],
    //     user: 'Ionic',
    //     saved: false,
    //     userID: '1',
    //   },
    //   {
    //     _id: '2',
    //     title: 'Ionic 5',
    //     description:
    //       'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
    //     url: 'https://ionicframework.com/',
    //     tags: ['RoboBoat', 'SDV', 'Research', 'Desktop'],
    //     user: 'Ionic',
    //     saved: true,
    //     userID: '1',
    //   },
    //   {
    //     _id: '3',
    //     title: 'Ionic 5',
    //     description:
    //       'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
    //     url: 'https://ionicframework.com/',
    //     tags: ['RoboSub', 'Framework', 'UAV', 'Perception'],
    //     user: 'Ionic',
    //     saved: true,
    //     userID: '1',
    //   },
    //   {
    //     _id: '4',
    //     title: 'Ionic 5',
    //     description:
    //       'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
    //     url: 'https://ionicframework.com/',
    //     tags: ['Ionic', 'RoboSub', 'Mobile', 'Research'],
    //     user: 'Ionic',
    //     saved: false,
    //     userID: '1',
    //   },
    // ];
    (await this.repositoryService.getFavoriteRepositories()).subscribe((res) => {
      if (!res['ok']) {
        // this.UserService.logout();
        return;
      }
      this.repositories = res['user']['savedRepositories'];
    });
  }

  logOut(){
    this.UserService.logout();
  }
}
