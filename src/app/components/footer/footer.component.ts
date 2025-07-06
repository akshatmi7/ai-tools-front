import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  scrollToTools() {
    // Check if we are already on the home page
    if (this.router.url === '/') {
      document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
        }, 300); // wait for the home page to load
      });
    }
  }
}
