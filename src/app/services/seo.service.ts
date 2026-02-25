import { Injectable } from '@angular/core';
import { Title , Meta } from '@angular/platform-browser';

@Injectable({

 providedIn:'root'

})

export class SeoService{

 constructor(

 private title:Title,
 private meta:Meta

 ){}


 updateSEO(

 titleText:string,
 description:string

 ){

 this.title.setTitle(titleText);

 this.meta.updateTag({

 name:'description',
 content:description

 });

 // Open Graph

 this.meta.updateTag({

 property:'og:title',
 content:titleText

 });

 this.meta.updateTag({

 property:'og:description',
 content:description

 });

 }

}