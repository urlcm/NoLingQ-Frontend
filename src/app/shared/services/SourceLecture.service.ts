import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lecture } from "../models/Lecture";
import { SourceLecture } from "../models/SourceLecture";

@Injectable({
  providedIn: 'root'
})
export class SourceLectureService{
  constructor(private http: HttpClient) {}

  url_main:string = "http://localhost:8081/source-lecture-controller" ;
  url_save:string = "/save";
  url_getById:string = "/get-lecture/";

  saveSourceLecture(sourcelecture: SourceLecture):Observable<number> {
    return this.http.post<number>(this.url_main + this.url_save, sourcelecture);
  }

  getSourceLectureById(id : number):Observable<SourceLecture>{
    return this.http.get<SourceLecture>(this.url_main + this.url_getById+ id);
  }

}