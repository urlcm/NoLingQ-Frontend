import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SourceMedia } from "../models/SourceMedia";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SourceMediaService {
  constructor(private httpClient: HttpClient){}
  url_main = "http://localhost:8081/source-media-controller/";
  url_save = "save"

  saveSourceMedia(sourceMedia: SourceMedia):Observable<SourceMedia> {
    return this.httpClient.post<SourceMedia>(this.url_main +this.url_save,sourceMedia);
  }

}