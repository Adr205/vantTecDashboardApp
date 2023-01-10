import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repository } from 'src/app/interfaces/repository';
import { RepositoryService } from '../../services/repository.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-repository-info',
  templateUrl: './repository-info.page.html',
  styleUrls: ['./repository-info.page.scss'],
})
export class RepositoryInfoPage implements OnInit {
  repository?: any = {
    _id: '',
    title: '',
    description: '',
    url: '',
    tags: [],
    user: '',
    saved: false,
    userID: ''
  };

  loading: any;

  constructor(private route: ActivatedRoute, private repositoryService: RepositoryService, private loadCtrl: LoadingController) { }

  async ngOnInit() {
    this.loading = await this.loadCtrl.create({
      message: 'Loading...'
    });
    await this.loading.present();
    const id = this.route.snapshot.paramMap.get('id');
    await this.getRepositoryInfo(id);
  }

  async getRepositoryInfo(id:string){
    (await this.repositoryService.getRepository(id)).subscribe((res) => {
      if (!res['ok']) {
        // this.UserService.logout();
        return;
      }

      this.repository = res['repository'];
      this.loading.dismiss();
    });
  }

  goToSite(url:any){
    console.log(url);
    // if url includs https 
    if(!url.includes('https')){
      url = 'https://' + url;
      window.open(url, '_system');
    }else{
      window.open(url, '_system');
    }
  }

  openMenu(){
    
  }

}
