/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { UserLogin } from '../../../models/user-model';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() activeForm = false;

  register: UserLogin = {
    email: '',
    password: '',
  };
  constructor(private closeF: UsersService) {}

  ngOnInit(): void {}

  closeForm() {
    this.closeF.$send.emit(false);
  }

  // this.closeF.$send.subscribe((valor) => (this.activeForm = valor));
}
