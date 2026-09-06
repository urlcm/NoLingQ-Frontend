import { Component, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from '../shared/services/AudioService';
import { LectureState } from '../shared/state/LectureState.service';
import { Progress } from '../shared/models/Progress';
import { Subscription } from 'rxjs';
import { Lecture } from '../shared/models/Lecture';

@Component({
  selector: 'app-lecture-media',
  imports: [],
  templateUrl: './lecture-media.component.html',
  styleUrl: './lecture-media.component.css'
})
export class LectureMediaComponent{

  constructor(private audioService:AudioService,
  ){}

  playAudio(){
    this.audioService.play();
  }

  stopAudio(){
    this.audioService.stopPlaying();
  }
  
  backwardAudio(){
    this.audioService.backAudio(5);
  }

  forwardAudio(){
    this.audioService.forwardAudio(5);
  }

}
