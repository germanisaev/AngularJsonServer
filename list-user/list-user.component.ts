import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  Users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserList().subscribe((res: User[]) => {
      this.Users = res;
    });
  }

  removeUser(id: any) {
    var result = confirm("Are you sure you want to delete this record?");
    if (result) {
      this.userService.deleteUser(id).subscribe(res => {
        this.Users = this.Users.filter(user => user.id !== id);
        console.log(res);
      });
    }
  }

}

