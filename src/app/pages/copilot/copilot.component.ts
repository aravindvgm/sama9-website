import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-copilot',
  templateUrl: './copilot.component.html',
  styleUrls: ['./copilot.component.css']
})
export class CopilotComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('AI Copilot | Sama9 — Intelligent Assistant for Every Module');
    this.meta.updateTag({ name: 'description', content: 'Sama9 Copilot is an AI layer embedded across School ERP, Diagnostics, and Enterprise modules. Ask questions in plain English, trigger workflows, and surface predictive insights.' });
    this.meta.updateTag({ property: 'og:url',   content: 'https://sama9.com/ai-copilot' });
    this.meta.updateTag({ property: 'og:title', content: 'AI Copilot | Sama9 — Intelligent Assistant for Every Module' });
  }
}
