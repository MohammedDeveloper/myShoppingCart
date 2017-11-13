import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /// base values
  item: string;
  quantity: number;
  myCartItems: any;

  constructor(public navCtrl: NavController,
    private storage: Storage) {

    /// set the default values..
    this.quantity = 1;
    this.myCartItems = [];

    /// get the items value set in ionic storage module - Promise
    this.storage.get("mycartitems")
      .then((val) => {

        /// check for val
        if (val !== null) {

          /// parse the value
          let myCartItemsTemp = JSON.parse(val);
          this.myCartItems = myCartItemsTemp;
        }
      });
  }

  /// Remove items from cart
  removeItemFromcart(index) {
    
    /// check for the item and splice it
    if (index !== null && index !== undefined) {

      /// pop it...
      this.myCartItems.splice(index, 1);

      /// check for length
      if (null === this.myCartItems || undefined === this.myCartItems || this.myCartItems.length === 0)
        this.myCartItems = [];

      /// set the mycartitems in IONIC local storage
      this.storage.set("mycartitems", JSON.stringify(this.myCartItems));
    }
  }

  /// Add items to cart
  addItemTocart() {

    /// push the items to the cart
    if (this.item !== null && this.item !== undefined && this.item !== ""
      && this.quantity !== null && this.quantity !== undefined && !isNaN(this.quantity)) {

      /// push...
      this.myCartItems.push({
        item: this.item,
        quantity: this.quantity
      });

      /// set the item & qty to default
      this.item = "";
      this.quantity = 1;

      /// set the mycartitems in IONIC local storage
      this.storage.set("mycartitems", JSON.stringify(this.myCartItems));
    }
    else
      return;
  }
}
