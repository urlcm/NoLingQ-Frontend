import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Progress } from "../../shared/models/Progress";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ProgressService{
    constructor(private httpClient: HttpClient) {}
    public progress: Progress

    url_main = "http://localhost:4200/progress-controller/"
    url_gettById = "get-progress/"

    getProgressById(id:number):Observable<Progress>{
        return this.httpClient.get<Progress>(this.url_main + this.url_gettById + id);
    }


}