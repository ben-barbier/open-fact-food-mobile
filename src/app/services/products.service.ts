import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {OpenFoodFactResponse} from '../models/openFoodFactResponse.model';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) {
    }

    public getProduct(ean: string): Observable<Product> {
        return this.http.get<OpenFoodFactResponse>(`https://world.openfoodfacts.org/api/v0/product/${ean}`).pipe(
            map((offr: OpenFoodFactResponse): Product => offr.product)
        );
    }

    public isVegan(product: Product): boolean {
        return product.ingredients_analysis_tags.some((tag: string) => tag === 'en:vegan');
        // return product.ingredients_analysis_tags.some((tag: string) => {
        //     if (tag === 'en:vegan') {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // });
    }

}
