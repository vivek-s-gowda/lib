import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../model/data.model';
import { LinkService } from '../services/link.service';
import { LocalStorageService } from '../services/localstorage.service';
import { PaymentService } from '../services/payment.service';
import { AlertController } from '@ionic/angular';
declare var Razorpay: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.page.html',
  styleUrls: ['./pricing.page.scss'],
})
export class PricingPage implements OnInit {
  from: string;
  plan: string;
  updatedUserData: User
  username: string
  constructor(
    private navigator: Router,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private linkService: LinkService,
    public alertController: AlertController
  ) {
    this.route.queryParams.subscribe((params) => {
      this.from = params.from;
    });

    this.username = this.localStorageService.getItem('username');
  }

  options = {
    key: 'rzp_live_lCTJ7OV3ecHUJb', // Enter the Key ID generated from the Dashboard
    amount: '100', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Lincit',
    description: 'Lincit subscription',
    image: 'https://firebasestorage.googleapis.com/v0/b/linkinbio-5e60b.appspot.com/o/public_assets%2Ffavicon2.png?alt=media&token=77d9d823-1fdd-48b2-9945-cdc4e040ced9',
    order_id: 'order_9A33XWu170gUtm', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler:  async (response) => {
      this.linkService.getUser(this.username);
      this.linkService.subject$.subscribe(async (res: User) => {
        console.log(res);
        if (res != null) {
          this.updatedUserData = res; 
          this.updatedUserData['planPerchaseDate'] = new Date().toString();
          let planExpireDate = new Date();
          planExpireDate.setMonth(planExpireDate.getMonth() + 1);
          this.updatedUserData.PlanExpiresOn = new Date(planExpireDate).toString();
          this.updatedUserData['userType'] = this.plan;
          this.linkService.update(this.username,this.updatedUserData);
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Payment success 🤠',
            subHeader: 'Profile subscribed',
            message: 'Click Ok to continue to your profile.',
            buttons: ['OK']
          });
      
          await alert.present();
      
          const { role } = await alert.onDidDismiss();
          this.navigator.navigate(['/'])
        }
      });
    },
    prefill: {
      name: 'Vivek',
      email: 'sgowdavivek@gmail.com',
      contact: '7760448418',
    },
    notes: {
      address: 'Lincit',
    },
    theme: {
      color: '#3399cc',
    },
  }

  ngOnInit() {
  }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Payment success 🤠',
  //     subHeader: 'Profile subscribed',
  //     message: 'Click Ok to continue to your profile.',
  //     buttons: ['OK']
  //   });

  //   await alert.present();

  //   const { role } = await alert.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  //   this.navigator.navigate(['/'])
  // }


  payment(price: string, plan: string) {
    if (this.from !== 'homepage') {
      this.plan = plan
      let dataform = {
        name: 'vivek',
        amount: price,
        email: 'sgowdavivek@gmail.com',
      };
      this.paymentService.createOrder(dataform).subscribe((res) => {
        console.log(res);
        this.options.key = res['key'];
        this.options.amount = res['value']['amount'];
        this.options.name = dataform['name'];
        this.options.order_id = res['value']['id'];
        // this.options.handler = this.razorPayResponseHandler;
        var rzp1 = new Razorpay(this.options);
        rzp1.open();
        console.log('opened');
      });
    }
  }
  
  razorPayResponseHandler(response) {
    console.log(response);

    this.successPayment();
// razorpay_order_id: "order_JjRHbgnPcWzD2B"
// razorpay_payment_id: "pay_JjRHj9MrVLMkgS"
// razorpay_signature: "46c09388984deae366206a1e9533f626e049c069704191e93d395e7086a632bf"

  }

  successPayment()
  {
    this.linkService.getUser(this.username);
    this.linkService.subject$.subscribe((res: User) => {
      console.log(res);
      if (res != null) {
        this.updatedUserData = res; 
        this.updatedUserData['planPerchaseDate'] = new Date().toString();
        let planExpireDate = new Date();
        planExpireDate.setMonth(planExpireDate.getMonth() + 1);
        this.updatedUserData.PlanExpiresOn = new Date(planExpireDate).toString();
        this.updatedUserData['userType'] = this.plan;
        this.linkService.update(this.username,this.updatedUserData)
      }
    });
  }
}
