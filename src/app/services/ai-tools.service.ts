import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AITool } from '../data/ai-tools';

@Injectable({
  providedIn: 'root'
})
export class AIToolsService {
  private apiUrl = 'http://localhost:8080/api/ai-tools';

  constructor(private http: HttpClient) {}

  addTool(tool: AITool): Observable<AITool> {
    return this.http.post<AITool>(`${this.apiUrl}`, tool); // POST /api/ai-tools
  }

  getAllTools(): Observable<AITool[]> {
    return this.http.get<AITool[]>(`${this.apiUrl}`); // GET /api/ai-tools
  }

  // You can add more methods like getToolById(), deleteTool(), updateTool() etc.
}
