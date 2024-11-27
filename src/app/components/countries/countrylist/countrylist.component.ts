import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CountriesService } from '../../../services/countries.service';
import Swal from 'sweetalert2'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-countrylist',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ CommonModule, FormsModule ],
  templateUrl: './countrylist.component.html',
  styleUrl: './countrylist.component.css',
})
export class CountrylistComponent implements OnInit {
  countries: any[] = [];

  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  deleteCountry(CountryID: number): void {
    if (CountryID === null || CountryID === undefined) {
      console.error('CountryID no válido:', CountryID);
      Swal.fire('Error', 'ID de país no válido.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el país seleccionado de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.countryService.deleteCountry(CountryID).subscribe(
          () => {
            this.countries = this.countries.filter((country) => country.CountryID !== CountryID);
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


  createCountry(): void {
    Swal.fire({
      title: 'Crear Nuevo País',
      html: `
        <input type="text" id="NameCountry" class="swal2-input" placeholder="Nombre del país" required>
      `,
      confirmButtonText: 'Crear País',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const NameCountry = (document.getElementById('NameCountry') as HTMLInputElement).value;
        if (!NameCountry) {
          Swal.showValidationMessage('Por favor complete todos los campos.');
          return false;
        }
        return { NameCountry: NameCountry };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newCountry = { NameCountry: result.value.NameCountry };

        this.countryService.createCountry(newCountry).subscribe(
          (createdCountry) => {
            this.countries.push(createdCountry);
            Swal.fire('¡País Creado!', 'El país ha sido creado correctamente.', 'success');
          },
          (error) => {
            if (error.status === 400 && error.error.detail === 'El país con este nombre ya existe.') {
              Swal.fire('Error', 'Ya existe un país con ese nombre.', 'error');
            } else {
              Swal.fire('Error', 'Hubo un error al crear el país.', 'error');
            }
            console.error('Error creando país:', error);
          }
        );
      }
    });
  }

  editCountry(country: any): void {
    Swal.fire({
      title: 'Editar País',
      html: `
        <input id="CountryName" class="swal2-input" placeholder="Nombre del País" value="${country.NameCountry}">
      `,
      confirmButtonText: 'Actualizar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const updatedName = (document.getElementById('CountryName') as HTMLInputElement).value;
        if (!updatedName) {
          Swal.showValidationMessage('Por favor ingresa un nombre de país');
          return false;
        }
        return updatedName;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCountry = {
          CountryID: country.CountryID,
          NameCountry: result.value
        };
      
        // Pasar dos argumentos: ID del país y objeto de datos del país
        this.countryService.updateCountry(updatedCountry.CountryID, updatedCountry).subscribe(
          (updated) => {
            Swal.fire('¡Actualizado!', 'El país ha sido actualizado correctamente.', 'success');
            this.loadCountries();
          },
          (error) => {
            Swal.fire('Error', 'Hubo un error al actualizar el país.', 'error');
            console.error('Error actualizando el país:', error);
          }
        );
      }
    });
  }
}
