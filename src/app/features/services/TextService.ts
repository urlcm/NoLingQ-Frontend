import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lecture } from "../../shared/models/Lecture";

@Injectable({
  providedIn: 'root'
})
export class TextService{
  main_url = "http://localhost:8081/text-controller/"
  get_url = "extract-text"
  getReplace_url = "replace"; 

  constructor(private httpClient: HttpClient) {}
  private lecture: Lecture

  GetText(path:string, page:number): Observable<string> {
        const params = new HttpParams()
        .set('path', path)
        .set('page', page);

    return this.httpClient.get(this.main_url + this.get_url, {
      params,
      responseType: "text"
    });
  }
    
}