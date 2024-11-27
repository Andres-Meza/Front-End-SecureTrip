import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  service = {
    ServiceName: '',
    Description: '',
    Price: null,
    ServiceType: '',
    AvailabilityStatus: 'Disponible',
    ServicePriority: '',
    LastModified: new Date().toISOString()
  };

  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) {}

  createService() {
    this.service.LastModified = new Date().toISOString();
  
    console.log('Objeto completo a enviar:', JSON.stringify(this.service));

    this.servicesService.createService(this.service).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Servicio Creado',
          text: 'El servicio se ha registrado correctamente',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/services-list']);
      },
      error => {
        console.error('Error completo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Crear Servicio',
          text: 'No se pudo registrar el servicio. Verifique los datos.',
          confirmButtonText: 'Cerrar'
        });
      }
    );
  }
}
