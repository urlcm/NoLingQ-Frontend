import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SourceLectureService{
  constructor(private http: HttpClient) {}

  url_main:string = "http://localhost:4200/source-lecture-controller/" ;
  url_save:string = "source-lecture/save-source-lecture";
  url_get:string = "";

}