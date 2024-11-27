import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  services = [
    {
      icon: 'guide-icon',
      title: 'Personalized Accompaniment',
      description: 'Hire local guides who deeply understand Colombian culture and speak multiple languages.'
    },
    {
      icon: 'interpreter-icon',
      title: 'Professional Interpreters',
      description: 'Break language barriers with expert interpreters for crucial interactions.'
    },
    {
      icon: 'camera-icon',
      title: 'Professional Photography',
      description: 'Capture high-quality memories with professional photographers.'
    },
    {
      icon: 'transport-icon',
      title: 'Safe Transportation',
      description: 'Move around Colombia safely with certified and reliable private drivers.'
    }
  ];

  features = [
    'Rigorous Guide Verification',
    'Real-time Location Sharing',
    'Comprehensive Trip Planning',
    'Trusted Local Recommendations'
  ];
}
