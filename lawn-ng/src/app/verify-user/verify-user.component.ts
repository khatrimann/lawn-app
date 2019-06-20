import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserManagerService } from '../services/user-manager.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  email = undefined;
  token = undefined;
  verified = false;
  constructor(private route: ActivatedRoute, private userManagerService: UserManagerService) {
    this.email = route.snapshot.queryParamMap.get('email');
    this.token = route.snapshot.queryParamMap.get('token');
    console.log(this.email, this.token);
    userManagerService.verifyUser(this.email, this.token).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.verified = true;
      }
    });
   }

  ngOnInit() {

  }

}
