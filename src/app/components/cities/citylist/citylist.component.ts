import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitiesService } from '../../../services/cities.service';
import { CountriesService } from '../../../services/countries.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citylist',
  standalone: true,
  templateUrl: './citylist.component.html',
  styleUrls: ['./citylist.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CitylistComponent implements OnInit {
  cities: any[] = [];
  countries: any[] = [];
  editingCity: any = null;

  constructor(
    private cityService: CitiesService,
    private countryService: CountriesService,
  ) {}

  ngOnInit(): void {
    this.loadCities();
    this.loadCities();
  }

  loadCities(): void {
    this.cityService.getCitiesWithCountries().subscribe((data) => {
      this.cities = data;
    });
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  deleteCity(cityId: number): void {
    this.cityService.deleteCity(cityId).subscribe(() => {
      this.cities = this.cities.filter((city) => city.city_id !== cityId);
      Swal.fire({
        title: '¡Eliminado!',
        text: 'La ciudad ha sido eliminada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    });
  }

  editCity(city: any): void {
    this.editingCity = { ...city };
  }

  onSubmit(): void {
    if (this.editingCity) {
      this.cityService.updateCity(this.editingCity.city_id, this.editingCity).subscribe(
        (updatedCity) => {
          const index = this.cities.findIndex((city) => city.city_id === updatedCity.city_id);
          if (index !== -1) {
            this.cities[index] = updatedCity;
          }
          this.cancelEdit();
          
          Swal.fire({
            title: '¡Actualización Exitosa!',
            text: 'La ciudad ha sido actualizada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al actualizar la ciudad.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.error('Error actualizando la ciudad:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editingCity = null;
  }

  createCity(): void {
    Swal.fire({
      title: 'Crear Nueva Ciudad',
      html: `
        <input type="text" id="cityName" class="swal2-input" placeholder="Nombre de la ciudad" required>
        <select id="countryId" class="swal2-input" required>
          <option value="">Seleccione un país</option>
          ${this.countries.map(country => 
            `<option value="${country.country_id}">${country.country_name}</option>`
          ).join('')}
        </select>
      `,
      confirmButtonText: 'Crear Ciudad',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const cityName = (document.getElementById('cityName') as HTMLInputElement).value;
        const countryId = (document.getElementById('countryId') as HTMLSelectElement).value;

        if (!cityName || !countryId) {
          Swal.showValidationMessage('Por favor complete todos los campos.');
          return false;
        }

        return { cityName, countryId };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newCity = { 
          city_name: result.value.cityName, 
          country_id: Number(result.value.countryId) 
        };
        
        this.cityService.createCity(newCity).subscribe(
          (createdCity) => {
            this.cities.push(createdCity);
            Swal.fire('¡Ciudad Creada!', 'La ciudad ha sido creada correctamente.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Hubo un error al crear la ciudad.', 'error');
            console.error('Error creando ciudad:', error);
          }
        );
      }
    });
  }
}
