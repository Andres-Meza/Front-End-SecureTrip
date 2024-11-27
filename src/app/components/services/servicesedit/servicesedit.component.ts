import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicesService } from '../../../services/services.service';

@Component({
	selector: 'app-servicesedit',
	standalone: true,
	imports: [ CommonModule, FormsModule ],
	templateUrl: './servicesedit.component.html',
	styleUrl: './servicesedit.component.css'
})
export class ServiceseditComponent implements OnInit {
	service = {
		Description: '',
		Price: null,
		AvailabilityStatus: 'Disponible',
		ServicePriority: '',
	};
	serviceID: number | null = null;

	constructor(
		private servicesService: ServicesService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.serviceID = +id;
		}

		if (this.serviceID) {
			this.loadService();
		}
	}

	loadService(): void {
		if (this.serviceID !== null) {
			this.servicesService.getServices().subscribe(
				(data) => {
					this.service = data;
				},
				(error) => {
					Swal.fire('Error', 'No se pudo cargar el servicio', 'error');
				}
			);
		}
	}

	onSubmit(): void {
		if (this.serviceID !== null) {
      
			this.servicesService.updateService(this.serviceID, this.service).subscribe(
				(updatedService) => {
					Swal.fire('¡Servicio Actualizado!', 'El servicio ha sido actualizado correctamente.', 'success');
					this.router.navigate(['/services-list']);
				},
				(error) => {
					Swal.fire('Error', 'Hubo un error al actualizar el servicio.', 'error');
					console.error('Error actualizando servicio:', error);
				}
			);
		}
	}

	cancelEdit(): void {
		this.router.navigate(['/services-list']);
	}
}