import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './pages/products/products-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductsComponent } from './components/products/products.component';
import { AiCopilotComponent } from './components/ai-copilot/ai-copilot.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServicesComponent } from './pages/services/services.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { DataSecurityComponent } from './pages/data-security/data-security.component';
import { EnterpriseComponent } from './pages/enterprise/enterprise.component';
import { CopilotComponent } from './pages/copilot/copilot.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AiCopilotPageComponent } from './pages/ai-copilot-page/ai-copilot-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeroComponent,
    ProductsComponent,
    AiCopilotComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    ProductsPageComponent,
    ServicesComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    DataSecurityComponent,
    EnterpriseComponent,
    CopilotComponent,
    AboutPageComponent,
    ContactPageComponent,
    AiCopilotPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
