import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitiesService } from '../../../services/cities.service';
import { CountriesService } from '../../../services/countries.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citylist',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    this.loadCountries();
  }

  loadCities(): void {
    this.cityService.getCitiesWithCountries().subscribe((data) => {
      this.cities = data;
    });
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(
      (data) => {
        this.countries = data;
    });
  }

  deleteCity(city: any): void {
    console.log('Objeto ciudad completo:', JSON.stringify(city, null, 2));

    const CityID = city?.CityID || city?.id || city?.cityId || city?.['CityID'] || city?.['id'];

    console.log('CityID extraído:', CityID);
    console.log('Tipo de CityID:', typeof CityID);
    console.log('Objeto completo:', city);

    if (CityID == null) {
      console.error('CityID no encontrado en el objeto:', city);
      Swal.fire('Error', 'No se pudo encontrar el ID de la ciudad.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará la Ciudad seleccionada de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cityService.deleteCity(CityID).subscribe({
          next: () => {
            this.cities = this.cities.filter((c) => c.CityID !== CityID);
            Swal.fire('¡Eliminado!', 'La Ciudad ha sido eliminada correctamente.', 'success');
            this.loadCities();
          },
          error: (error) => {
            console.error('Error al eliminar la ciudad:', error);
            Swal.fire('Error', 'Hubo un error al eliminar la ciudad.', 'error');
          }
        });
      }
    });
  }

  editCity(city: any): void {
    console.log('Ciudad a editar:', city);
    console.log('City ID:', city.cityId);

    if (!city.cityId) {
      Swal.fire('Error', 'ID de ciudad no válido.', 'error');
      return;
    }

    Swal.fire({
      title: 'Editar Ciudad',
      html: `
        <input id="NameCity" class="swal2-input" placeholder="Nombre de la Ciudad" value="${city.NameCity}">
      <select id="CountryId" class="swal2-input" required>
        <option value="">Seleccione un país</option>
        ${this.countries.map(country => 
          `<option value="${country.CountryID}">${country.NameCountry}</option>`
        ).join('')}
      </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const NameCity = (document.getElementById('NameCity') as HTMLInputElement).value.trim();
        const countryId = (document.getElementById('CountryId') as HTMLSelectElement).value;

        if (!NameCity || !countryId) {
          Swal.showValidationMessage('Por favor complete todos los campos.');
          return false;
        }

        return {
          cityId: city.cityId,
          cityName: NameCity,
          countryId: Number(countryId)
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCity = result.value;
        this.cityService.updateCity(updatedCity.cityId, updatedCity).subscribe({
          next: () => {
            Swal.fire('¡Actualizado!', 'La ciudad ha sido actualizada correctamente.', 'success');
            this.loadCities();
          },
          error: (error) => {
            Swal.fire('Error', 'Hubo un problema al actualizar la ciudad.', 'error');
            console.error('Error actualizando la ciudad:', error);
          }
        });
      }
    });
  }


  createCity(): void {
    Swal.fire({
      title: 'Crear Nueva Ciudad',
      html: `
        <input type="text" id="NameCity" class="swal2-input" placeholder="Nombre de la ciudad" required>
        <select id="CountryID" class="swal2-input" required>
          <option value="">Seleccione un país</option>
          ${this.countries.map(country => 
            `<option value="${country.CountryID}">${country.NameCountry}</option>`
          ).join('')}
        </select>
      `,
      confirmButtonText: 'Crear Ciudad',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const NameCity = (document.getElementById('NameCity') as HTMLInputElement).value;
        const CountryID = (document.getElementById('CountryID') as HTMLSelectElement).value;

        if (!NameCity || !CountryID) {
          Swal.showValidationMessage('Por favor complete todos los campos.');
          return false;
        }

        return { NameCity, CountryID };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newCity = { 
          NameCity: result.value.NameCity, 
          CountryID: Number(result.value.CountryID) 
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
