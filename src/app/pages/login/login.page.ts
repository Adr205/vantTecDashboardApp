import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private navCtrl: NavController,
    private uiService: UiService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  async onLogin() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.valid) {
      const valid = await this.userService.login(email, password);

      if (valid) {
        this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
        console.log('Login Succesfull');
        this.uiService.showToast('Login Succesfull', 'success', 'top');
      } else {
        this.uiService.showToast('Invalid email or password', 'danger', 'top');
      }
    }else{
      if(this.loginForm.controls.email.errors){
        this.uiService.showToast('Enter a valid email', 'danger', 'top');
      }else{
        this.uiService.showToast('Enter a valid password, it must have at leat 8 characters', 'danger', 'top');
      }
    }
  }
}
