import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollaboratorsService } from '../../../services/collaborators.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaboratorlist',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './collaboratorlist.component.html',
  styleUrl: './collaboratorlist.component.css'
})

export class CollaboratorlistComponent implements OnInit {

  collaborators: any[] = [];

  constructor(
    private collaboratorService: CollaboratorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCollaborators();
  }

  loadCollaborators(): void {
    this.collaboratorService.getCollaborators().subscribe((data) => {
      this.collaborators = data;
    });
  }

  deleteCollaborator(collaboratorId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al colaborador de manera permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.collaboratorService.deleteCollaborator(collaboratorId).subscribe(
          () => {
            this.collaborators = this.collaborators.filter(
              (collaborator) => collaborator.collaboratorId !== collaboratorId
            );
            Swal.fire('Eliminado', 'El colaborador ha sido eliminado', 'success');
            this.loadCollaborators();
          },
          (error) => {
            Swal.fire('Error', 'Hubo un error al eliminar el colaborador', 'error');
            console.error('Error eliminando colaborador:', error);
          }
        );
      }
    });
  }

  editCollaborator(collaboratorId: number): void {
    this.router.navigate([`/collaborators-edit/${collaboratorId}`]);
  }

  createCollaborator(): void {
    this.router.navigate([`/collaborators-add/`]);
  }
}
