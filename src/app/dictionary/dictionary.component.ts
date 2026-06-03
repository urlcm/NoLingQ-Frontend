import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dictionary',
  imports: [],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css'
})
export class DictionaryComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.wordInput = "###"
    this.sanitizeUrl();
  }
  url_dictionary: string = "https://www.dict.com/ingles-espanol/";
  //word: string = "###";
  @Input() wordInput: string = "###";
  safeUrl: SafeResourceUrl;
  @Input() set trigger(value:any){
    this.sanitizeUrl();
    console.log("TRIGER",value);
    console.log("Nueva url", this.safeUrl)
  }

  sanitizeUrl() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.url_dictionary + this.wordInput
    );
  }

}