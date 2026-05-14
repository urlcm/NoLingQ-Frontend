import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lecture } from "../../shared/models/Lecture";

@Injectable({
  providedIn: 'root'
})
export class SourceLectureService{
  constructor(private http: HttpClient) {}

  url_main:string = "http://localhost:4200/source-lecture-controller" ;
  url_save:string = "/save";
  url_get:string = "/get-lectures";


  saveLecture(lecture: Lecture):Observable<number> {
    return this.http.post<number>(this.url_main + this.url_save, lecture);
  }

}