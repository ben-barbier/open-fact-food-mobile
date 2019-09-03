import {Product} from './product.model';

export interface OpenFoodFactResponse {
    code: string;
    status_verbose: string;
    product: Product;
    status: number;
}
