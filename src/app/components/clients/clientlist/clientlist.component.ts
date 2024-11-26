import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientlist',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './clientlist.component.html',
  styleUrl: './clientlist.component.css'
})
export class ClientlistComponent {
  clients: any[] = [];

  constructor(
    private clientService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
    });
  }

  deleteClient(clientId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al cliente permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(clientId).subscribe(
          () => {
            this.clients = this.clients.filter((client) => client.client_id !== clientId);
            Swal.fire('Eliminado', 'El cliente ha sido eliminado', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Hubo un error al eliminar el cliente', 'error');
            console.error('Error eliminando cliente:', error);
          }
        );
      }
    });
  }

  editClient(clientId: number): void {
    this.router.navigate([`/clients/edit/${clientId}`]);
  }

}
