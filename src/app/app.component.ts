import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
@Input() onClose;
  public flagWindow: boolean;
  fl: boolean;

  eventClose($event: any) {
    console.log('вывод');
  }
  toggle() {
    this.flagWindow = !this.flagWindow;
  }
}
