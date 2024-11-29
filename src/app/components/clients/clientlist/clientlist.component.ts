import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientlist',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ CommonModule, FormsModule ],
  templateUrl: './clientlist.component.html',
  styleUrl: './clientlist.component.css'
})
export class ClientlistComponent {
  clients: any[] = []; 
  filteredClients: any[] = [];
  searchKeyword: string = '';

  constructor(
    private clientService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {  
    this.clientService.getClients().subscribe((data: any[]) => {  
      this.clients = data;
      this.filteredClients = data;
    });  
  } 

  searchClients(): void {  
    if (this.searchKeyword.trim()) {  
      this.filteredClients = this.clients.filter(client =>   
        client.FirstName.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||   
        client.LastName.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||  
        client.Email.toLowerCase().includes(this.searchKeyword.toLowerCase()) // Puedes añadir más campos  
      );  
    } else {  
      this.filteredClients = this.clients; // Si no hay búsqueda, mostrar todos  
    }  
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
            this.loadClients();
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
    this.router.navigate([`/clients-edit/${clientId}`]);
  }

  createClient(): void {
    this.router.navigate([`/clients-add/`]);
  }

}
