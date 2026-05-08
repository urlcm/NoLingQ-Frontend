import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private url = "http://localhost:8080/lecture-controller/";
  private urlSaveObject = ""; 

  constructor(private httpClient: HttpClient) { }

  SaveLecture(lecture: Lecture) : Observable<Object>{
    return this.httpClient.post(this.url)
  }
}
