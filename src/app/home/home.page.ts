import {Component} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Product} from '../models/product.model';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public product: Product = undefined;
    public loading = false;
    public isVegan = false;

    constructor(private productsService: ProductsService,
                private toastController: ToastController) {
    }

    // example of EAN : 3250392490485
    public searchProduct(input: CustomEvent) {
        const searchText = input.detail.value;
        this.product = null;
        if (searchText.length === 13) {
            this.loading = true;
            this.productsService.getProduct(searchText).subscribe((product: Product) => {
                this.product = product;
                this.isVegan = this.productsService.isVegan(product);
                this.loading = false;
                this.toastController.create({
                    message: 'Produit trouvé 🚀.',
                    duration: 2000
                }).then(toaster => toaster.present());
            });
        }
    }

    public resetSearch() {
        this.product = null;
    }
}
