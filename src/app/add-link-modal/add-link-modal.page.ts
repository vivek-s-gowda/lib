import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-link-modal',
  templateUrl: './add-link-modal.page.html',
  styleUrls: ['./add-link-modal.page.scss'],
})
export class AddLinkModalPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {}

  linkForm: FormGroup;

  ngOnInit() {
    this.linkForm = this.fb.group({
      imageUrl: [
        'https://lh3.googleusercontent.com/-169teTA_3vI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck8Hcd40DI7czgwOv2JRdXZVtqptw/photo.jpg?sz=46',
      ],
      linkUrl: ['', Validators.required],
      linkName: ['', Validators.required],
    });
  }

  ionViewWillEnter() {}

  addNewLink() {
    this.modalController.dismiss({
      dismissed: true,
      newLink: this.linkForm.value,
    });
  }
}
