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

     options = {
      "key": "rzp_live_lCTJ7OV3ecHUJb", // Enter the Key ID generated from the Dashboard
      "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Lincit",
      "description": "Lincit subscription",
      "image": "https://example.com/your_logo",
      "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      "prefill": {
          "name": "Vivek",
          "email": "sgowdavivek@gmail.com",
          "contact": "7760448418"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };

  ngOnInit() {
  }

  payment (price:string) {
    let dataform = {
      name: "vivek",
      amount: price,
      email: 'sgowdavivek@gmail.com'
    }
    this.paymentService.createOrder(dataform).subscribe((res) => {
      console.log(res)
    this.options.key = res['key'];
    this.options.amount = res ['value']['amount'];
    this.options.name = dataform['name'];
    this.options.order_id = res['value']['id'];
    this.options.handler = this.razorPayResponseHandler
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    console.log('opened');
    })
  }

    razorPayResponseHandler(response) {
      console.log(response);
    }

}
