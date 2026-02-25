import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isOpen    = false;
  isScrolled = false;

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
    document.body.classList.toggle('menu-open', this.isOpen);
  }

  closeMenu(): void {
    this.isOpen = false;
    document.body.classList.remove('menu-open');
  }

  @HostListener('window:scroll')
  onScroll(): void { this.isScrolled = window.scrollY > 40; }

  @HostListener('document:keydown.escape')
  onEscape(): void { if (this.isOpen) this.closeMenu(); }
}
