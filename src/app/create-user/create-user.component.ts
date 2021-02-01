import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      contact: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.userForm.value);
    this.userService.createUser(this.userForm.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['list-users']);
    });
  };

}


