import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'greatoutdoors';

  logout(){
    window.location.href="http://localhost:4300";
  }
}
