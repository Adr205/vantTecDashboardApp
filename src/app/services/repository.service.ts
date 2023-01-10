import { EventEmitter, Injectable } from '@angular/core';
import { Repository } from '../interfaces/repository';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '../interfaces/user';
import { UiService } from './ui.service';

const URL = environment.URL;

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  newRepository = new EventEmitter<Repository>();
  deleteRepository = new EventEmitter<Repository>();
  updatedRepository = new EventEmitter<Repository>();
  newFavorite = new EventEmitter<Repository>();
  deleteFavorite = new EventEmitter<Repository>();

  constructor(private http: HttpClient, private userService: UserService, private UIService: UiService) {}

  createRepository(data: any) {
    const { repository, usuario } = data;
    const headers = new HttpHeaders({
      'x-token': this.userService.token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    return this.http
      .post(`${URL}/repository`, data, { headers })
      .subscribe((response: any) => {
        if(response.ok){
          this.newRepository.emit(repository);
          this.userService.saveToken(response.token);
          this.userService.addDeleteCreatedRepository(repository._id);
        }
      });
  }

  updateRepository(data: any){
    const{repository} = data;
    const headers = new HttpHeaders({
      'x-token': this.userService.token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    return this.http.put(`${URL}/repository/${repository._id}`, data, { headers }).subscribe((response: any) => {
      if(response.ok){
        this.updatedRepository.emit(repository);
        this.UIService.showToast('Repository updated', 'success', 'top');
      }else{
        this.UIService.showToast('Error updating repository', 'danger', 'top');
      }
    });

  }

  deleteRepo(repository: Repository) {
    const id = repository._id;

    const headers = new HttpHeaders({
      'x-token': this.userService.token,
      'Access-Control-Allow-Origin': '*',
    });

    return this.http.delete(`${URL}/repository/${id}`, { headers }).subscribe((response: any) => {
      if(response.ok){
        this.deleteRepository.emit(repository);
        this.UIService.showToast('Repository deleted', 'danger', 'top');
      }else{
        this.UIService.showToast('Error deleting repository', 'danger', 'top');
      }
    });



    this.deleteRepository.emit(repository);
  }

  async createFavorite(repository: Repository) {
    // await this.userService.addDeleteFavorite(repository._id);

    const data = {
      repositoryID: repository._id,
    };

    const headers = new HttpHeaders({
      'x-token': this.userService.token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    return this.http
      .post(`${URL}/repository/favorite`, data, { headers })
      .subscribe((response: any) => {
        
        if (response.ok) {
          this.userService.saveToken(response.userToken);
          this.userService.addDeleteFavorite(repository._id);
          if(response.added){
            this.UIService.showToast('Added to favorites', 'success', 'top');
            this.newFavorite.emit(repository);
          }else{
            this.deleteFavorite.emit(repository);
            this.UIService.showToast('Removed from favorites', 'danger', 'top');
          }
          
        }
      });
  }

  async deleteFav(repository: Repository) {
    const data = {
      repositoryID: repository._id,
    };

    const headers = new HttpHeaders({
      'x-token': this.userService.token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    return this.http
      .post(`${URL}/repository/favorite`, data, { headers })
      .subscribe((response: any) => {
        
        if (response.ok) {
          this.userService.saveToken(response.userToken);
          this.deleteFavorite.emit(repository);
          this.userService.addDeleteFavorite(repository._id);
          this.UIService.showToast('Removed to favorites', 'danger', 'top');
          
        }
      });
  }

  async getRepositories() {
    const headers = new HttpHeaders({
      'x-token': this.userService.token,
    });

    return await this.http.get<Repository>(`${URL}/repository`, { headers });
  }

  async getFavoriteRepositories() {
    const headers = new HttpHeaders({
      'x-token': this.userService.token,
    });

    return await this.http.get<Repository>(
      `${URL}/repository/saved/favorites`,
      { headers }
    );
  }

  async isFavorite(repositoryID: string) {
    const favorites = await this.userService.getFavorites();
    const isFavorite = favorites.find((favorite) => favorite == repositoryID);

    return isFavorite;
  }

  async createdByUser(repositoryID: string) {
    const created = await this.userService.getCreatedRepositories();
    const isCreated = created.find((created) => created == repositoryID);

    return isCreated;
  }

  async getRepository(id: string) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token,
    });

    return await this.http.get<Repository>(`${URL}/repository/${id}`, {
      headers,
    });
  }
}
