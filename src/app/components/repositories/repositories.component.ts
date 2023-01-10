import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '../../interfaces/repository';
import { RepositoryService } from '../../services/repository.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  @Input()repositories : Repository[] = []

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit() {
    // this.getRepositories();
    // this.repositoryService.newRepository.subscribe((repository: Repository) => {
    //   this.repositories.push(repository);
    // });
  }

  getRepositories() {
    this.repositories = [
      {
        _id: '1',
        title: 'Ionic 5',
        description: 'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
        url: 'https://ionicframework.com/',
        tags: ['RoboBoat', 'RoboSub', 'SDV', 'UAV', 'Tutorial', 'Perception', 'Research'],
        user: 'Ionic',
        saved: false,
        userID: '1'
      },
      {
        _id: '2',
        title: 'Ionic 5',
        description: 'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
        url: 'https://ionicframework.com/',
        tags: ['RoboBoat', 'SDV', 'Research', 'Desktop'],
        user: 'Ionic',
        saved: true,
        userID: '1'
      },
      {
        _id: '3',
        title: 'Ionic 5',
        description: 'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
        url: 'https://ionicframework.com/',
        tags: ['RoboSub', 'Framework', 'UAV', 'Perception'],
        user: 'Ionic',
        saved: true,
        userID: '1'
      },
      {
        _id: '4',
        title: 'Ionic 5',
        description: 'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
        url: 'https://ionicframework.com/',
        tags: ['Ionic', 'RoboSub', 'Mobile', 'Research'],
        user: 'Ionic',
        saved: false,
        userID: '1'
      },
      {
        _id: '5',
        title: 'Ionic 5',
        description: 'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
        url: 'https://ionicframework.com/',
        tags: ['RoboBoat', 'Framework', 'Perception', 'UAV'],
        user: 'Ionic',
        saved: true,
        userID: '1'
      },
      {
        _id: '6',
        title: 'Ionic 5',
        description: 'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
        url: 'https://ionicframework.com/',
        tags: ['SDV', 'UAV', 'Mobile', 'Research'],
        user: 'Ionic',
        saved: true,
        userID: '1'
      },
      {
        _id: '6',
        title: 'Ionic 5',
        description: 'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
        url: 'https://ionicframework.com/',
        tags: ['Tutorial', 'Framework', 'RoboSub', 'Perception'],
        user: 'Ionic',
        saved: true,
        userID: '1'
      },
      {
        _id: '6',
        title: 'Ionic 5',
        description: 'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
        url: 'https://ionicframework.com/',
        tags: ['RoboBoat', 'Framework'],
        user: 'Ionic',
        saved: false,
        userID: '1'
      },
      {
        _id: '6',
        title: 'Ionic 5',
        description: 'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
        url: 'https://ionicframework.com/',
        tags: ['Research', 'Framework', 'SDV', 'RoboSub'],
        user: 'Ionic',
        saved: true,
        userID: '1'
      },
      {
        _id: '6',
        title: 'Ionic 5',
        description: 'Ionic 5 is a framework for building mobile and desktop apps with web technologies like HTML, CSS, and JavaScript.',
        url: 'https://ionicframework.com/',
        tags: ['RoboSub', 'Tutorial', 'Perception', 'UAV'],
        user: 'Ionic',
        saved: false,
        userID: '1'
      },
    ]
  }
}