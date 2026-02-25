import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

interface Product {
  icon: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  badge: string;
  badgeType: string;
  colorClass: string;
  ctaLabel: string;
  ctaHref: string;
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Products | Sama9 — School ERP, Diagnostics, Enterprise & AI Copilot');
    this.meta.updateTag({ name: 'description', content: "Explore Sama9's four AI-powered SaaS modules: School ERP, Diagnostics Management, Enterprise Automation, and AI Copilot — built for real-world scale." });
    this.meta.updateTag({ property: 'og:url',   content: 'https://sama9.com/products' });
    this.meta.updateTag({ property: 'og:title', content: 'Products | Sama9 — School ERP, Diagnostics, Enterprise & AI Copilot' });
  }

  products: Product[] = [
    {
      icon: '🏫',
      name: 'School ERP',
      tagline: 'Complete school management, powered by AI',
      description: 'End-to-end administration for modern schools. Admissions, academics, fee management, and parent engagement — unified on one AI-assisted platform.',
      features: [
        'Smart admissions & enrolment workflows',
        'Attendance tracking & timetable builder',
        'Fee collection, invoicing & reconciliation',
        'Academic records & grade management',
        'Parent portal with real-time notifications',
        'AI-generated student progress reports',
      ],
      badge: 'Available',
      badgeType: 'available',
      colorClass: 'c-blue',
      ctaLabel: 'Request a Demo',
      ctaHref: '/contact',
    },
    {
      icon: '🔬',
      name: 'Diagnostics Management',
      tagline: 'Lab-to-report, fully automated',
      description: 'Streamline every step from patient intake to result delivery. Built for diagnostic centres that demand speed, accuracy, and zero paper dependency.',
      features: [
        'Patient registration & medical history',
        'Lab workflow & sample chain tracking',
        'Digital test result entry & validation',
        'Automated PDF report generation',
        'Billing, insurance & payment gateway',
        'Multi-branch management & LIMS sync',
      ],
      badge: 'Available',
      badgeType: 'available',
      colorClass: 'c-teal',
      ctaLabel: 'Request a Demo',
      ctaHref: '/contact',
    },
    {
      icon: '⚙️',
      name: 'Enterprise Automation',
      tagline: 'Automate workflows across every department',
      description: 'AI-driven process automation at enterprise scale. Build, deploy, and monitor complex multi-step workflows — no code required, full audit control included.',
      features: [
        'Visual drag-and-drop workflow builder',
        'Multi-level approvals & escalation rules',
        'Real-time analytics & custom dashboards',
        'REST API & third-party integrations',
        'Role-based access & data permissions',
        'Full audit trail & compliance reporting',
      ],
      badge: 'Available',
      badgeType: 'available',
      colorClass: 'c-purple',
      ctaLabel: 'Request a Demo',
      ctaHref: '/contact',
    },
    {
      icon: '✦',
      name: 'AI Copilot',
      tagline: 'Your intelligent assistant, always on',
      description: 'A conversational AI layer embedded across every Sama9 module. Ask questions, generate reports, trigger workflows, and surface predictive insights — in plain language.',
      features: [
        'Natural language queries across all data',
        'Predictive analytics & anomaly alerts',
        'One-command workflow & task execution',
        'Instant report & document generation',
        'Role-based contextual response engine',
        '24/7 availability — no downtime, no limits',
      ],
      badge: 'Embedded in all modules',
      badgeType: 'embedded',
      colorClass: 'c-gold',
      ctaLabel: 'Explore Copilot',
      ctaHref: '/ai-copilot',
    },
  ];

}
