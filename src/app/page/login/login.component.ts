import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ 'liuyaowen', [ Validators.required ] ],
      password: [ '1234', [ Validators.required ] ],
      remember: [ true ],
    });
  }
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
    if (this.validateForm.valid) {
      this._login();
    }
  }
  _login() {
    this.router.navigate(['/main/movie/in_theaters']);
  }

}
