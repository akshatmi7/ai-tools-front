import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDark = false;
  menuOpen = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    this.isDark = theme === 'dark';
    if (this.isDark) {
      this.renderer.addClass(document.body, 'dark-theme');
    }
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
