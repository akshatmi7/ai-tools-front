import { Component, Input } from '@angular/core';
import { AITool } from 'src/app/data/ai-tools';

@Component({
  selector: 'app-tool-card',
  templateUrl: './tool-card.component.html',
  styleUrls: ['./tool-card.component.scss']
})
export class ToolCardComponent {
  @Input() tool!: AITool;
  useFallback(event: Event) {
  (event.target as HTMLImageElement).src = 'assets/fallback-icon.png';
}

}
