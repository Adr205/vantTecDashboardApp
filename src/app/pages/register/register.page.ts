import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private uiService: UiService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      secretKey: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  async onRegister() {
    const { firstName, lastName, email, password, secretKey } = this.loginForm.value;

    if (this.loginForm.valid) {
      const valid = await this.userService.registerUser(firstName, lastName, email, password, secretKey);
      if (valid) {
        this.uiService.showToast('Register Succesfull', 'success', 'top');
        this.navCtrl.navigateRoot('/login', { animated: true });
      }else{
        this.uiService.showToast('Register not successful', 'danger', 'top');
      }

    } else {
      if (this.loginForm.controls.email.errors) {
        this.uiService.showToast('Enter a valid email', 'danger', 'top');
      } else {
        this.uiService.showToast(
          'Enter a valid password, it must have at leat 8 characters',
          'danger',
          'top'
        );
      }
    }
  }
}
