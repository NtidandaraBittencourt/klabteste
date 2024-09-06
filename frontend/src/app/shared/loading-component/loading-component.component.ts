import { Component, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-component',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: 'loading-component.component.html',
  styleUrls: ['./loading-component.component.scss']
})

export class LoadingComponentComponent {
    @Input() isLoading: boolean = false;
}

