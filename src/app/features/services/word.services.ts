import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Word } from "../../shared/models/Word";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class WordService{
    constructor(private httpClient:HttpClient){}
    
    main_url = "http://localhost:8081/word-controller/"
    get_url_by_word = "by-word/";
    get_url_by_id = "by-id/"
    save = "save"

    getWordByWord(word:string):Observable<Word>{
        return this.httpClient.get<Word>(this.main_url+this.get_url_by_word+word);
    }

    getWordById(id:number){

    }

    saveWord(word:Word){
        
    }
}