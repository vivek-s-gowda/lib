import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
declare var Razorpay:any

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.page.html',
  styleUrls: ['./pricing.page.scss'],
})
export class PricingPage implements OnInit {

  constructor(private navigator:Router, private paymentService: PaymentService) { }

  razorPayOptions = {
    "key":"",
    "amount":"",
    "currency": "INR",
    "name": "",
    "description": "Skartz Payment",
    "order_id": "",
    "handler": (res) => {
    console.log(res);
    }
    };

  ngOnInit() {
  }

  // demoPay()
  // {
  //   window.location.href = "https://rzp.io/l/lincit"
  // }



  demoPay (formData: any) {
    // this.submitted = true;
    // this.loading = true;
    let dataform = {
      name: "vivek",
      amount: 500,
      email: 'sgowdavivek@gmail.com'
    }
    this.paymentService.createOrder(dataform).subscribe((res) => {
      console.log(res)
    this.razorPayOptions.key = res['key'];
    this.razorPayOptions.amount = res ['value']['amount'];
    this.razorPayOptions.name = dataform['name'];
    this.razorPayOptions.order_id = res['value']['id'];
    this.razorPayOptions.handler = this.razorPayResponseHandler
    var rzp1 = new Razorpay(this.razorPayOptions);
    rzp1.open();
    console.log('opened');
    })
  }

    razorPayResponseHandler(response) {
    console.log(response);
    }

}
