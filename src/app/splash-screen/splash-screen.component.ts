import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

   percentage = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      if (this.percentage < 100) {
        this.percentage++;
      } else {
        clearInterval(interval);
        this.router.navigate(['/home']); // 👈 Redirect after loading
      }
    }, 30); // Faster loading = 100 x 30ms = 3 seconds
  }
}
