import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user';
import {environment} from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const URL = environment.URL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string = null;
  private _storage: Storage | null = null;
  private usuario: User = {};
  private jwtHelper : JwtHelperService = new JwtHelperService();

  constructor(private navCtlr: NavController, private storage: Storage, private http: HttpClient) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    await this.loadToken();
    await this.getUser();
  }
  async loadToken() {
    this.token = (await this.storage.get('token')) || null;
  }

  async login(email:string, password:string){
    const data = {email, password};

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    return new Promise((resolve) => {
      this.http.post(`${URL}/auth/login`, data, {headers}).subscribe(async (response: any) => {
        this.token = response.token;
        console.log(response);
        if (response['ok']) {
          await this.saveToken(this.token);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });

    //this.http.post('http://localhost:3000/api/login', data)
  }

  async registerUser(firstName: string, lastName: string,email: string, password: string, secretKey: string){
    const data = {firstName, lastName, email, password, secretKey};

    return new Promise((resolve) => {
      this.http.post(`${URL}/user/register`, data).subscribe(async (response: any) => {
        this.token = response.token;
        if (response['ok']) {
          await this.saveToken(this.token);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });

  }

  async logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtlr.navigateRoot('/login', { animated: true });
  }

  async validateToken(): Promise<boolean> {
    await this.loadToken();
    // await this.getUser();
    // if (!this.token || !this.usuario) {
    //   await this.logout();
    //   return Promise.resolve(false);
    // }
    console.log(this.token);
    if(!this.token){
      await this.logout();
      return Promise.resolve(false);
    }

    await this.decodeJWT(this.token).then(async (response: any) => {
      const user = response.user;
      await this.saveUser(user);
    });

    if (!this.token || !this.usuario) {
      await this.logout();
      return Promise.resolve(false);
    }
    
    return Promise.resolve(true);
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    await this.validateToken();
  }

  async saveUser(user: User) {
    this.usuario = user;
    await this.storage.set('user', user);
  }

  async getUser() {
    if (!this.usuario._id) {
      await this.storage.get('user').then((user) => {
        this.usuario = user? user : null;
      });
    }
    return this.usuario;
  }

  async decodeJWT(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  async getFavorites(){
    return this.usuario.savedRepositories;
  }

  async addDeleteFavorite(id:string){
    if(this.usuario.savedRepositories.includes(id)){
      this.usuario.savedRepositories = this.usuario.savedRepositories.filter((item) => item !== id);
      await this.saveUser(this.usuario);
      
    }else{
      this.usuario.savedRepositories.push(id);
      await this.saveUser(this.usuario);
    }
  }

  
  async getCreatedRepositories(){
    return this.usuario.createdRepositories;
  }

  async addDeleteCreatedRepository(id:string){
    if(this.usuario.createdRepositories.includes(id)){
      this.usuario.createdRepositories = this.usuario.createdRepositories.filter((item) => item !== id);
    }else{
      this.usuario.createdRepositories.push(id);
    }
  }
}
