import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.css'
})
export class ServicesListComponent {
  services: any[] = [];

  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe(
      (data) => {
        this.services = data;
      },
      (error) => {
        console.error('Error cargando servicios:', error);
      }
    );
  }

  deleteService(serviceId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicesService.deleteService(serviceId).subscribe(() => {
          this.services = this.services.filter((service) => service.service_id !== serviceId);
          Swal.fire('¡Eliminado!', 'El servicio ha sido eliminado.', 'success');
          this.loadServices();
        });
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/services-add']);
  }

  navigateToEdit(serviceId: number): void {
    this.router.navigate([`/services-edit/${serviceId}`]);
  }
}
