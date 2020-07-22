import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const BASE_URL = "/assets/";

@Injectable({
  providedIn: 'root'
})
export class IconRegistrarService {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  registerSVGs(): void{
    this.matIconRegistry.addSvgIcon('thirty-apple', 
      this.domSanitizer.bypassSecurityTrustResourceUrl(BASE_URL + "001-apple.svg"));
    this.matIconRegistry.addSvgIcon('thirty-banana', 
      this.domSanitizer.bypassSecurityTrustResourceUrl(BASE_URL + "002-bananas.svg"));
    this.matIconRegistry.addSvgIcon('thirty-orange', 
      this.domSanitizer.bypassSecurityTrustResourceUrl(BASE_URL + "003-orange.svg"));
    this.matIconRegistry.addSvgIcon('thirty-passion-restaurant', 
      this.domSanitizer.bypassSecurityTrustResourceUrl(BASE_URL + "004-passion-restaurant.svg"));
  }
}
