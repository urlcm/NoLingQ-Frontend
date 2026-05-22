import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lecture } from "../../shared/models/Lecture";
import { SourceLecture } from "../../shared/models/SourceLecture";

@Injectable({
  providedIn: 'root'
})
export class SourceLectureService{
  constructor(private http: HttpClient) {}

  url_main:string = "http://localhost:8081/source-lecture-controller" ;
  url_save:string = "/save";
  url_getById:string = "/get-lecture/";

  saveSourceLecture(lecture: Lecture):Observable<number> {
    return this.http.post<number>(this.url_main + this.url_save, lecture);
  }

  getSourceLectureById(id : number):Observable<SourceLecture>{
    return this.http.get<SourceLecture>(this.url_main + this.url_getById+ id);
  }

}