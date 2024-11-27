import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransportServicesService } from '../../services/transportservices.service';
import Swal from 'sweetalert2';
import { CollaboratorsService } from '../../services/collaborators.service';

@Component({
  selector: 'app-transport-services',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './transport-services.component.html',
  styleUrl: './transport-services.component.css'
})
export class TransportServicesComponent {
  transportServices: any[] = [];
  collaborators: any[] = [];
  editingService: any = null;
  isLoading = false;

  constructor(
    private transportService: TransportServicesService,
    private collaboratorService: CollaboratorsService,
  ) {}

  ngOnInit(): void {
    this.loadTransportServices();
    this.loadCollaborators();
  }

  loadTransportServices(): void {
    this.transportService.getTransportServices().subscribe(
      (data) => {
        this.transportServices = data;
        console.log('Servicios de Transporte cargados:', this.transportServices);
      },
      (error) => {
        console.error('Error cargando los servicios de transporte:', error);
      }
    );
  }

  loadCollaborators() {
    this.isLoading = true;
    this.collaboratorService.getCollaborators().subscribe(
      (collaborators) => {
        this.collaborators = collaborators;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error cargando colaboradores:', error);
        this.isLoading = false;
      }
    );
  }

  deleteService(TransportID: number): void {
    if (TransportID === null || TransportID === undefined) {
      console.error('TransportID no válido:', TransportID);
      Swal.fire('Error', 'ID de Transporte no válido.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el transporte seleccionado de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.transportService.deleteTransportService(TransportID).subscribe(
          () => {
            this.transportServices = this.transportServices.filter((transport) => transport.TransportID !== TransportID);
            Swal.fire('¡Eliminado!', 'El servicio de Transporte ha sido eliminado correctamente.', 'success');
          },
          (error) => {
            console.error('Error al eliminar el servicio:', error);
            Swal.fire('Error', 'Hubo un error al eliminar el servicio.', 'error');
          }
        );
      }
    });
  }

  createService(): void {
    Swal.fire({
      title: 'Crear Nuevo Servicio de Transporte',
      html: `
        <input type="text" id="TransportType" class="swal2-input" placeholder="Nombre del Servicio" required>
        <input type="number" id="Capacity" class="swal2-input" placeholder="Capacidad" required>
      <select id="CollaboratorID" class="swal2-input" required>
        <option value="">Seleccione Conductor</option>
        ${this.collaborators.map(driver => 
          `<option value="${driver.CollaboratorID}">${driver.FirstName} ${driver.LastName}</option>`
        ).join('')}
      </select>
      `,
      confirmButtonText: 'Crear Transporte',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const TransportType = (document.getElementById('TransportType') as HTMLInputElement).value;
        const Capacity = +(document.getElementById('Capacity') as HTMLInputElement).value;
        const DriverID = +(document.getElementById('CollaboratorID') as HTMLInputElement).value

        if (!TransportType || !Capacity || !DriverID) {
          Swal.showValidationMessage('Por favor ingrese todos los datos.');
          return false;
        }

        return { TransportType, Capacity, DriverID };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newServiceTransport = { TransportType: result.value.TransportType, Capacity: result.value.Capacity, DriverID: result.value.CollaboratorID };

        this.transportService.createTransportService(newServiceTransport).subscribe(
          (createdTransportService) => {
            this.transportServices.push(createdTransportService);
            Swal.fire('¡Servicio de Transporte Creado!', 'El servicio ha sido creado correctamente.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Hubo un error al crear el Servicio de Transporte.', 'error');
            console.error('Error creando Servicio de transporte:', error);
          }
        );
      }
    });
  }

  editService(service: any): void {
    Swal.fire({
      title: 'Editar Servicio de Transporte',
      html: `
        <input type="text" id="type" class="swal2-input" value="${service.TransportType}" placeholder="Tipo de Transporte">
        <input type="number" id="capacity" class="swal2-input" value="${service.Capacity}" placeholder="Capacidad">
        <select id="CollaboratorID" class="swal2-input" required>
          <option value="">Seleccione un Conductor</option>
          ${this.collaborators.map(driver => 
            `<option value="${driver.CollaboratorID}" ${driver.CollaboratorID === service.CollaboratorID ? 'selected' : ''}>
              ${driver.FirstName} ${driver.LastName}
            </option>`
          ).join('')}
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      preConfirm: () => {
        const type = (document.getElementById('type') as HTMLInputElement).value;
        const capacity = +(document.getElementById('capacity') as HTMLInputElement).value;
        const CollaboratorID = +(document.getElementById('CollaboratorID') as HTMLSelectElement).value;

        if (!type || !capacity || !CollaboratorID) {
          Swal.showValidationMessage('Por favor, completa todos los campos.');
          return false;
        }

        return { type, capacity, CollaboratorID };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedService = { 
          TransportType: result.value.type, 
          Capacity: result.value.capacity,
          CollaboratorID: result.value.CollaboratorID
        };
        
        this.transportService.updateTransportService(service.TransportID, updatedService).subscribe(
          () => {
            const index = this.transportServices.findIndex(
              (s) => s.TransportID === service.TransportID
            );
            
            if (index !== -1) {
              // Actualiza directamente usando los valores consistentes
              this.transportServices[index] = {
                ...this.transportServices[index],
                TransportType: updatedService.TransportType,
                Capacity: updatedService.Capacity,
                CollaboratorID: updatedService.CollaboratorID
              };
            }
            
            Swal.fire('¡Actualizado!', 'El servicio de transporte ha sido actualizado.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al actualizar el servicio.', 'error');
            console.error('Error actualizando servicio:', error);
          }
        );
      }
    });

  }

  getCollaboratorName(DriverID: number): string {
    if (this.isLoading || !this.collaborators) {
      return 'N/A';
    }

    const collaborator = this.collaborators.find((c) => c.CollaboratorID === DriverID);
    return collaborator ? `${collaborator.FirstName} ${collaborator.LastName}` : 'N/A';
  }

}
