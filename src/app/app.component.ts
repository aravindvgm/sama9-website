import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {

  title = 'sama9-site';

  private routerSub: Subscription;
  private observer: IntersectionObserver;

  constructor(private router: Router) {

    this.observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          this.observer.unobserve(e.target);
        }
      }),
      { threshold: 0.08 }
    );

    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        if (!event.urlAfterRedirects.includes('#')) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }

        // Re-query after Angular renders the new route view
        setTimeout(() => {
          document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
            this.observer.observe(el);
          });
        }, 0);

      });

  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.observer.disconnect();
  }

}