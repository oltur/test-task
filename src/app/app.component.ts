import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test Task for WebTrekk';

  constructor(
    private router: Router
  ) { }
}
