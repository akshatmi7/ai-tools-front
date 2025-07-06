import { Component } from '@angular/core';
import { AI_TOOLS, AITool } from 'src/app/data/ai-tools';
import { Router } from '@angular/router';
import { AIToolsService } from '../../services/ai-tools.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tools: AITool[] = [];
  filteredTools: AITool[] = [];

  searchTerm: string = '';
  selectedCategory: string = 'All';

  categories: string[] = ['All', 'Text', 'Image', 'Code', 'Video'];

  currentPage = 1;
  toolsPerPage = 15;

  constructor(private router: Router, private aiToolsService: AIToolsService) {}

  ngOnInit(): void {
    this.fetchAllTools();
  }

  fetchAllTools(): void {
    this.aiToolsService.getAllTools().subscribe({
      next: (data: AITool[]) => {
        this.tools = data;
        this.filteredTools = data;
      },
      error: (err: any) => console.error('Error fetching tools:', err)
    });
  }

  filterTools() {
    this.filteredTools = this.tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || tool.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  get paginatedTools() {
    const start = (this.currentPage - 1) * this.toolsPerPage;
    const end = start + this.toolsPerPage;
    return this.filteredTools.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredTools.length / this.toolsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  
}
