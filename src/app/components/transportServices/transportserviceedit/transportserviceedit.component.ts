import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TransportServicesService } from '../../../services/transportservices.service';
import { CollaboratorsService } from '../../../services/collaborators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transportserviceedit',
  imports: [ CommonModule, FormsModule],
  templateUrl: './transportserviceedit.component.html',
  styleUrl: './transportserviceedit.component.css'
})
export class TransportserviceeditComponent {
  transport = {
    TransportType: '',
    Capacity: '',
    DriverID:''
  };

  conductors: any[] = [];

  constructor(
    private transportService: TransportServicesService,
    private collaboratorService: CollaboratorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.collaboratorService.getConductors().subscribe((data) => {
      this.conductors = data;
    });
  }

  onSubmit(): void {
    this.transportService.createTransport(this.transport).subscribe(
      (createdTransport) => {
        Swal.fire('¡Servicio de Transporte Creado!', 'El servicio de transporte ha sido creado correctamente.', 'success');
        this.router.navigate(['/transports']);  // Redirigir a la lista de servicios de transporte
      },
      (error) => {
        Swal.fire('Error', 'Hubo un error al crear el servicio de transporte.', 'error');
        console.error('Error creando servicio de transporte:', error);
      }
    );
  }
}
