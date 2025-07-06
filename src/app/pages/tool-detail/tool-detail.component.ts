import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AITool } from '../../data/ai-tools';

@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.scss']
})
export class ToolDetailComponent implements OnInit {

  tool: AITool | undefined;
  researchText = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const toolName = this.route.snapshot.paramMap.get('id');
    if (toolName) {
      this.fetchTool(toolName);
    }
  }

  fetchTool(toolName: string) {
      this.isLoading = true;
      this.http.get<AITool>(`http://localhost:8080/api/ai-tools/${toolName}`)
        .subscribe({
          next: res => {
            this.tool = res;
            this.researchText = res.researchText || '';
            this.isLoading = false;
          },
          error: err => {
            console.error('Error fetching tool:', err);
            this.isLoading = false;
          }
        });
    }
    regenerateResearch() {
    if (!this.tool) return;
    this.isLoading = true;

    this.http.post<AITool>(`http://localhost:8080/api/ai-tools/${this.tool.name}/regenerate`, {})
      .subscribe({
        next: res => {
          this.researchText = res.researchText || '';
          this.tool = res;
          this.isLoading = false;
        },
        error: err => {
          console.error('Error regenerating research:', err);
          this.isLoading = false;
        }
      });
  }

}
