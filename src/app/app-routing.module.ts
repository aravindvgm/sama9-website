import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './pages/products/products-page.component';
import { ServicesComponent } from './pages/services/services.component';

import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { AiCopilotComponent } from './components/ai-copilot/ai-copilot.component';

import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { DataSecurityComponent } from './pages/data-security/data-security.component';

import { EnterpriseComponent } from './pages/enterprise/enterprise.component';
import { CopilotComponent } from './pages/copilot/copilot.component';


const routes: Routes = [

{
 path:'',
 component: HomeComponent,
 pathMatch:'full'
},

{
 path:'services',
 component: ServicesComponent
},

{
 path:'products',
 component: ProductsPageComponent
},

// ✅ FIXED
{
 path:'ai-copilot',
 component: AiCopilotComponent
},

// ✅ FIXED
{
 path:'about',
 component: AboutComponent
},

// ✅ FIXED
{
 path:'contact',
 component: ContactComponent
},

{
 path:'enterprise-automation',
 component: EnterpriseComponent
},

{
 path:'copilot',
 component: CopilotComponent
},

{
 path:'privacy-policy',
 component: PrivacyPolicyComponent
},

{
 path:'terms-of-service',
 component: TermsComponent
},

{
 path:'data-security',
 component: DataSecurityComponent
},

{
 path:'**',
 redirectTo:''
}

];


@NgModule({

imports:[

RouterModule.forRoot(routes,{

scrollPositionRestoration:'enabled',

anchorScrolling:'enabled',

scrollOffset:[0,90],

initialNavigation:'enabledBlocking'

})

],

exports:[RouterModule]

})

export class AppRoutingModule {}