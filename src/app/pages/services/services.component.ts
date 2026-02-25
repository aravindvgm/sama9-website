import { Component , OnInit } from '@angular/core';

import { SeoService } from '../../services/seo.service';

@Component({

 selector:'app-services',

 templateUrl:'./services.component.html',

 styleUrls:['./services.component.css']

})

export class ServicesComponent implements OnInit{

 constructor(

 private seo:SeoService

 ){}


 ngOnInit(): void {

 this.seo.updateSEO(

 'Sama Technologies Services | AI SaaS Solutions',

 'Sama Technologies provides School ERP, Diagnostics Software, Enterprise Automation and AI Copilot SaaS platforms.'

 );

 }

}