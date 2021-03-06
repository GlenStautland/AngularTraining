import { AfterViewInit, Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    listFilter: string;
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    
    @ViewChild('filterElement') filterElementRef: ElementRef;
    private _filterInput: NgModel;

    get filterInput():NgModel{
        return this._filterInput;
    }

    set filterInput(value: NgModel){
        this._filterInput = value;
        if(this.filterInput){
            this.filterInput.valueChanges.subscribe(
                () => {
                    this.performFilter(this.listFilter);
                    console.log('Performed filer')
                }
            );
        }
        if(this.filterElementRef){
            this.filterElementRef.nativeElement.focus();
        }
    }

    @ViewChild(NgModel)
    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) { }


 

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
