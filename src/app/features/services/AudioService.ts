import { Injectable } from "@angular/core";
import { Progress } from "../../shared/models/Progress";
import { ProgressService } from "./Progress.sevice";

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    private audioBook: HTMLAudioElement;
    private progress: Progress;

    constructor(private progressService:ProgressService) {}

    setProgress(progressParam:Progress) {
        this.progress = progressParam;
    }

    play() {
        if(!this.progress.currentTimeSecs) {
            this.progress.currentTimeSecs = BigInt("0");
        }

        this.audioBook.currentTime = Number.parseInt(this.progress.currentTimeSecs.toString());

        this.audioBook.play().catch(error => {
            console.error("Error al reproducir audio:", error);
        });
    }


    stopPlaying(){
        this.progress.currentTimeSecs = BigInt(this.audioBook.currentTime.toString());
        this.audioBook.pause();
        this.saveProgress();
    }

    saveProgress(){
        this.progressService.saveProgress(this.progress).subscribe({
            next:(progressObject) =>{
                console.info("Progreso guardado",progressObject)
            },
            error: (error) => {
                console.error("Se presento el siguiente error al querer guardar",error)
            }
        });
    }


}