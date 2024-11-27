import { Component, OnInit } from '@angular/core';
import { PaymentsService, PaymentRequest, PaymentResponse } from '../../../services/payments.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-payment',
  imports: [ CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  ipAddress: string = '';
  payment: PaymentRequest = {
    ClientID: 0,
    ServiceID: 0,
    Amount: 0,
    PaymentMethod: '',
    IPAddress: '',
    Reference: ''
  };
  mensaje: string | null = null;
  
  constructor(
    private paymentService: PaymentsService,
    private http: HttpClient,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.http.get<any>('https://api.ipify.org?format=json').subscribe((data) => {
      this.ipAddress = data.ip;
      this.payment.IPAddress = this.ipAddress;
    });
  }
  

  registerPayment() {
    console.log('Datos enviados:', this.payment);
    this.paymentService.registerPayment(this.payment).subscribe(
      (response: any) => {
        this.mensaje = response.mensaje;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error al registrar el pago', error);
        this.mensaje = 'Error al registrar el pago';
      }
    );
  }
}