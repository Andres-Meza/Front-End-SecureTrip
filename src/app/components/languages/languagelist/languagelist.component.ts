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

  deleteLanguage(languageId: number): void {
    this.languageService.deleteLanguage(languageId).subscribe(() => {
      this.languages = this.languages.filter((language) => language.language_id !== languageId);
    });
  }

  createLanguageWithSweetAlert(): void {
    Swal.fire({
      title: 'Crear Nuevo Idioma',
      html: `
        <input type="text" id="languageName" class="swal2-input" placeholder="Nombre del idioma" required>
      `,
      confirmButtonText: 'Crear Idioma',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const languageName = (document.getElementById('languageName') as HTMLInputElement).value;

        if (!languageName) {
          Swal.showValidationMessage('Por favor ingrese el nombre del idioma.');
          return false;
        }

        return { languageName };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newLanguage = { language_name: result.value.languageName };

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
}
