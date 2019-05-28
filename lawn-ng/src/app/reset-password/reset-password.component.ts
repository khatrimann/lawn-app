import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email = undefined;
  token = undefined;

  constructor(private route: ActivatedRoute) {
    this.email = route.snapshot.queryParamMap.get('email');
    this.token = route.snapshot.queryParamMap.get('token');
  }

  ngOnInit() {

  }

}
