import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private toastCtlr: ToastController) { }

  async showToast(message:string, color: string, position){
    const toast = await this.toastCtlr.create({
      message,
      color,
      duration: 2000,
      position
    });
    await toast.present();
  }
}
