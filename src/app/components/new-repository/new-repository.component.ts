import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { Repository } from '../../interfaces/repository';
import { UserService } from '../../services/user.service';
import { RepositoryService } from '../../services/repository.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-new-repository',
  templateUrl: './new-repository.component.html',
  styleUrls: ['./new-repository.component.scss'],
})
export class NewRepositoryComponent implements OnInit {
  @Input() repository: Repository;

  chips = [
    'RoboBoat',
    'RoboSub',
    'SDV',
    'UAV',
    'Tutorial',
    'Perception',
    'Research',
  ];

  create = true;

  formRepository: FormGroup;

  constructor(private modalCtr: ModalController, private fb: FormBuilder, private userService: UserService, private repositoryService: RepositoryService) {
    this.formRepository = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.repository) {
      console.log(this.repository.tags);
      this.formRepository.patchValue(this.repository);
      this.formRepository.addControl('tags', this.fb.control(this.repository.tags));
      this.create = false;
    }
  }

  async createRepository() {
    if (this.create) {
      this.formRepository.addControl('tags', this.fb.control(this.chips));
      
      const usuario = await this.userService.getUser();
      const data = {
        repository: this.formRepository.value,
        usuario
      };

      this.modalCtr.dismiss(data);

    }else{
      this.formRepository.addControl('tags', this.fb.control(this.chips));
      this.formRepository.addControl('_id', this.fb.control(this.repository._id));
      const data = {
        repository: this.formRepository.value,
      };

      this.repositoryService.updateRepository(data);

      this.modalCtr.dismiss(data);
    }
  }

  dismiss() {
    this.modalCtr.dismiss();
  }

  onEnter(target:Event) {
    // this.chips.push(value);
    // target.value = '';
    this.chips.push((target.target as HTMLInputElement).value);
    (target.target as HTMLInputElement).value = '';
  }

  removeChip(chip) {
    this.chips = this.chips.filter((c) => c !== chip);
  }
}
