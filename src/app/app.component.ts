import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  readonly router = inject(Router);
  
  title = 'tfg-alba';



  @HostListener('window:keydown.escape', ['$event'])
  escapePushed(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigateByUrl('/home');
  }
}
