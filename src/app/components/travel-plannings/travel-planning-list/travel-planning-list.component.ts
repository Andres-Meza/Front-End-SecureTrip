import { Component } from '@angular/core';
import { TravelPlanningsService } from '../../../services/travelplannings.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-travel-planning-list',
  imports: [ CommonModule, FormsModule],
  templateUrl: './travel-planning-list.component.html',
  styleUrl: './travel-planning-list.component.css'
})
export class TravelPlanningListComponent {
  travelPlannings: any[] = [];

  constructor(
    private travelPlanningService: TravelPlanningsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTravelPlannings();
  }

  loadTravelPlannings(): void {
    this.travelPlanningService.getTravelPlans().subscribe(
      (data) => {
        this.travelPlannings = data;
      },
      (error) => {
        console.error('Error cargando planificaciones:', error);
      }
    );
  }

  deleteTravelPlanning(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.travelPlanningService.deleteTravelPlan(id).subscribe(() => {
          this.travelPlannings = this.travelPlannings.filter(
            (planning) => planning.id !== id
          );
          Swal.fire('¡Eliminado!', 'La planificación ha sido eliminada.', 'success');
        });
      }
    });
  }

  navigateToEdit(id: number): void {
    this.router.navigate([`/travel-plannings/edit/${id}`]);
  }

  navigateToCreate(): void {
    this.router.navigate(['/travel-plannings/create']);
  }
}
