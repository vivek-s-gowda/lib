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
  selector: 'app-add-new-link',
  templateUrl: './add-new-link.component.html',
  styleUrls: ['./add-new-link.component.scss'],
})
export class AddNewLinkComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {}

  linkForm: FormGroup;

  ngOnInit() {}

  ionViewWillEnter() {
    this.linkForm = this.fb.group({
      imageUrl:['', Validators.required],
      linkUrl: ['', Validators.required],
      linkName: ['', Validators.required],
    });
  }

  addNewLink() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
