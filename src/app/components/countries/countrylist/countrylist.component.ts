import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../services/countries.service';
import Swal from 'sweetalert2'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-countrylist',
  standalone: true,
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

  deleteCountry(countryId: number): void {
    this.countryService.deleteCountry(countryId).subscribe(() => {
      this.countries = this.countries.filter((country) => country.country_id !== countryId);
    });
  }

  createCountry(): void {
    Swal.fire({
      title: 'Crear Nuevo País',
      html: `
        <input type="text" id="countryName" class="swal2-input" placeholder="Nombre del país" required>
      `,
      confirmButtonText: 'Crear País',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const countryName = (document.getElementById('countryName') as HTMLInputElement).value;

        if (!countryName) {
          Swal.showValidationMessage('Por favor ingrese el nombre del país.');
          return false;
        }

        return { countryName };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newCountry = { country_name: result.value.countryName };

        this.countryService.createCountry(newCountry).subscribe(
          (createdCountry) => {
            this.countries.push(createdCountry);
            Swal.fire('¡País Creado!', 'El país ha sido creado correctamente.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Hubo un error al crear el país.', 'error');
            console.error('Error creando país:', error);
          }
        );
      }
    });
  }
}
