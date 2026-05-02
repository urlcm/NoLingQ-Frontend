import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class NavigationService {
    constructor(private router:Router){}

    goToHome()
    {
        this.router.navigate(["home"]);
    }
    
    goToLecture(){
        this.router.navigate(["lecture"]);
    }

    goToCreateNewLecture(){
        this.router.navigate(["new-lecture"]);
    }
}