import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Sama Technologies | AI-Powered SaaS for Schools, Diagnostics &amp; Enterprises');
    this.meta.updateTag({ name: 'description', content: 'Sama9 by Sama Technologies — AI-powered SaaS platform for school administration, diagnostics management, and enterprise automation. Built for real-world scale.' });
    this.meta.updateTag({ property: 'og:url',   content: 'https://sama9.com/' });
    this.meta.updateTag({ property: 'og:title', content: 'Sama9 | AI-Powered SaaS for Schools, Diagnostics & Enterprises' });
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
