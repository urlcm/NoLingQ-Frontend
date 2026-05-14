import { Component } from '@angular/core';
import { LectureComponentComponent } from "../lecture-component/lecture-component.component";
import { LectureMediaComponent } from "../lecture-media/lecture-media.component";
import { DictionaryComponent } from "../dictionary/dictionary.component";
import { DefinitionViewComponent } from "../definition-view/definition-view.component";

@Component({
  selector: 'app-lecture-view',
  imports: [LectureComponentComponent, LectureMediaComponent, DictionaryComponent, DefinitionViewComponent],
  templateUrl: './lecture-view.component.html',
  styleUrl: './lecture-view.component.css'
})
export class LectureViewComponent {
  
}
