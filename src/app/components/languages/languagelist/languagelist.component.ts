import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LanguagesService } from '../../../services/languages.service';

@Component({
  selector: 'app-languagelist',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './languagelist.component.html',
  styleUrl: './languagelist.component.css'
})
export class LanguagelistComponent implements OnInit {

  languages: any[] = [];

  constructor(private languageService: LanguagesService) {}

  ngOnInit(): void {
    this.loadLanguages();
  }

  loadLanguages(): void {
    this.languageService.getLanguages().subscribe((data) => {
      this.languages = data;
    });
  }

  deleteLanguage(LanguageID: number): void {
    if (LanguageID === null || LanguageID === undefined) {
      console.error('LangugageID no válido:', LanguageID);
      Swal.fire('Error', 'ID de lenguaje no válido.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el lenguaje seleccionado de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.languageService.deleteLanguage(LanguageID).subscribe(
          () => {
            this.languages = this.languages.filter((language) => language.LanguageID !== LanguageID);
            Swal.fire('¡Eliminado!', 'El país ha sido eliminado correctamente.', 'success');
          },
          (error) => {
            console.error('Error al eliminar el país:', error);
            Swal.fire('Error', 'Hubo un error al eliminar el país.', 'error');
          }
        );
      }
    });
  }

  createLanguageWithSweetAlert(): void {
    Swal.fire({
      title: 'Crear Nuevo Idioma',
      html: `
        <input type="text" id="NameLanguage" class="swal2-input" placeholder="Nombre del idioma" required>
      `,
      confirmButtonText: 'Crear Idioma',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const NameLanguage = (document.getElementById('NameLanguage') as HTMLInputElement).value;

        if (!NameLanguage) {
          Swal.showValidationMessage('Por favor ingrese el nombre del idioma.');
          return false;
        }

        return { NameLanguage };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newLanguage = { NameLanguage: result.value.NameLanguage };

        this.languageService.createLanguage(newLanguage).subscribe(
          (createdLanguage) => {
            this.languages.push(createdLanguage);
            Swal.fire('¡Idioma Creado!', 'El idioma ha sido creado correctamente.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Hubo un error al crear el idioma.', 'error');
            console.error('Error creando idioma:', error);
          }
        );
      }
    });
  }

  updateLanguage(language: any): void {
    Swal.fire({
      title: 'Editar Lenguaje',
      html: `
        <input id="NameLanguage" class="swal2-input" placeholder="Nombre del País" value="${language.NameLanguage}">
      `,
      confirmButtonText: 'Actualizar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const updatedName = (document.getElementById('NameLanguage') as HTMLInputElement).value;
        if (!updatedName) {
          Swal.showValidationMessage('Por favor ingresa un nombre de lenguaje');
          return false;
        }
        return updatedName;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedLanguage = {
          LanguageID: language.LanguageID,
          NameLanguage: result.value
        };
        this.languageService.updateLanguage(updatedLanguage.LanguageID, updatedLanguage).subscribe(
          (updated) => {
            Swal.fire('¡Actualizado!', 'El lenguaje ha sido actualizado correctamente.', 'success');
            this.loadLanguages();
          },
          (error) => {
            Swal.fire('Error', 'Hubo un error al actualizar el lenguaje.', 'error');
            console.error('Error actualizando el país:', error);
          }
        );
      }
    });
  }
}
