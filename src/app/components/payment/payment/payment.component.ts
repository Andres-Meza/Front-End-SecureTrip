import { Component, OnInit } from '@angular/core';
import { PaymentsService, PaymentRequest, PaymentResponse } from '../../../services/payments.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from '../../../services/clients.service';
import { ServicesService } from '../../../services/services.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-payment',
  imports: [ CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent implements OnInit {
  ipAddress: string = '';
  payment = {
    ClientID: 0,
    ServiceID: 0,
    Amount: 0,
    PaymentMethod: '',
    IPAddress: '',
  };
  clients: any = [];
  services: any = [];
  paymentReference: string = '';
  mensaje: string = '';
  error: boolean = false;
  
  constructor(
    private paymentService: PaymentsService,
    private http: HttpClient,
    private router: Router,
    private clientService: ClientsService,
    private serviceService: ServicesService,
  ) {}
  
  ngOnInit(): void {
    this.getIPAddress(),
    this.loadClient(),
    this.loadServices();
  }
  
  
  getIPAddress(): void{
    this.http.get<any>('https://api.ipify.org?format=json').subscribe((data) => {
      this.ipAddress = data.ip;
      this.payment.IPAddress = this.ipAddress;
    });
  }

  loadClient() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  loadServices() {
    this.serviceService.getServices().subscribe(data => {
      this.services = data;
    });
  }
  
  registerPayment() {  
    this.paymentService.registerPayment(this.payment).subscribe(  
      (response: PaymentResponse) => {
        const referenciaPago = response.reference;
        this.mensaje = `Pago exitoso. Referencia: ${referenciaPago}`;  
        this.error = false;  

        Swal.fire({  
          title: 'Pago Registrado',  
          text: this.mensaje,  
          icon: 'success',  
          confirmButtonText: 'Aceptar'  
        }).then((result) => {  
          if (result.isConfirmed) {  
            this.router.navigate(['/payment-list']);  
          }  
        });  
      },  
      err => {  
        this.mensaje = 'Error al registrar el pago.';  
        this.error = true;  

        Swal.fire({  
          title: 'Error',  
          text: this.mensaje,  
          icon: 'error',  
          confirmButtonText: 'Aceptar'  
        });  
      }  
    );  
  } 
}