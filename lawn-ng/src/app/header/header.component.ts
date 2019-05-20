import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedin: Boolean;
  isLoggedOut: Boolean;


  constructor(private authService: AuthServiceService, private router: Router) {
    this.authService.getLoggedIn().subscribe(loggedIn => {
      this.isLoggedin = loggedIn;
      console.log(this.isLoggedin);
    });
    this.authService.getLoggedOut().subscribe(loggedOut => {
      this.isLoggedOut = loggedOut;
      console.log(this.isLoggedOut);
      if (this.isLoggedOut) {
        this.logout();
      }
    }).unsubscribe();
   }

  ngOnInit() {
    this.authService.getLoggedIn().subscribe(loggedIn => {
      this.isLoggedin = loggedIn;
      console.log(this.isLoggedin);
    });
    this.authService.getLoggedOut()
    .subscribe(loggedOut => {
      this.isLoggedOut = loggedOut;
      console.log(this.isLoggedOut);
      if (this.isLoggedOut) {
        this.logout();
      }
    }).unsubscribe();
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
