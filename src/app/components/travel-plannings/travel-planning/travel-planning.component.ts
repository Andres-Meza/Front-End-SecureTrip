import { Component } from '@angular/core';
import { TravelPlanningsService } from '../../../services/travelplannings.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-travel-planning',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './travel-planning.component.html',
  styleUrl: './travel-planning.component.css'
})
export class TravelPlanningComponent {

  travelPlanning = {
    client_id: null,
    guide_id: null,
    photographer_id: null,
    start_date: '',
    end_date: ''
  };

  constructor(
    private travelPlanningService: TravelPlanningsService,
    private router: Router
  ) {}

  createTravelPlanning(): void {
    this.travelPlanningService.createTravelPlan(this.travelPlanning).subscribe(
      (newTravelPlanning) => {
        Swal.fire(
          '¡Creado!',
          'La planificación de viaje ha sido creada correctamente.',
          'success'
        );
        this.router.navigate(['/travel-plannings']);
      },
      (error) => {
        Swal.fire('Error', 'Hubo un problema al crear la planificación.', 'error');
        console.error('Error creando planificación:', error);
      }
    );
  }

}
