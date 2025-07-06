import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AIToolsService } from '../../services/ai-tools.service';
// import { AITool } from '../../data/ai-tool';
import { AITool } from '../../data/ai-tools' // Update the path if 'ai-tool' is in 'models' folder, or correct as needed

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  toolForm!: FormGroup;  // Form group for the tool fields

  constructor(private fb: FormBuilder, private aiToolsService: AIToolsService) {}

  ngOnInit(): void {
    this.toolForm = this.fb.group({
      name: [''],
      slug: [''],
      category: [''],
      description: [''],
      fullDescription: [''],
      iconUrl: [''],
      website: ['']
    });
  }

  submitTool(): void {
    const tool: AITool = this.toolForm.value;

    this.aiToolsService.addTool(tool).subscribe({
      next: () => alert('✅ Tool added successfully!'),
      error: (err: any) => console.error('❌ Error adding tool:', err)
    });
  }
}
