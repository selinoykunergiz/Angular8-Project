import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/dto/product';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChild('productAddModal', { static: false }) public addModal: ModalDirective; //In Angular 8 , ViewChild takes 2 parameters
  @ViewChild('productDeleteModal', { static: false }) public deleteModal: ModalDirective;
  @ViewChild('productEditModal', { static: false }) public editModal: ModalDirective;
  @ViewChild('productDetailModal', { static: false }) public detailModal: ModalDirective;

  selectedImage: any = '';
  config: any;
  productList: Product[];
  p: number = 1;
  collection: [];
  addForm: FormGroup;
  product: Product;
  Id: number;
  editForm: FormGroup;
  detailForm: FormGroup;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private builder: FormBuilder) {
    //pagination
    this.config = {
      currentPage: 1,
      itemsPerPage: 20
    };

    this.route.queryParamMap
      .map(params => params.get('page'))
      .subscribe(page => this.config.currentPage = page);
  }

  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }

  ngOnInit() {
    this.getProductAll();
    this.clearAddForm();

    this.editForm = this.builder.group({
      memberId: new FormControl(null, []),
      storeName: new FormControl(null, [Validators.required]),
      storeDesc: new FormControl(null, [Validators.required])
    });

    this.detailForm = this.builder.group({
      storeId: new FormControl(null, []),
      storeName: new FormControl(null, [Validators.required]),
      storeSlug: new FormControl(null, [Validators.required]),
      storeTitle: new FormControl(null, [Validators.required]),
      memberId: new FormControl(null, []),
      storeDesc: new FormControl(null, [Validators.required]),
      displayLogo: new FormControl(null, [Validators.required]),
      storeLogoURL: new FormControl(null, [Validators.required])
    });
  }

  //all product list
  public getProductAll() {
    this.productService.getProducts()
      .subscribe(data => this.productList = Object.values(data));

  }

  //add methodu
  clearAddForm() {
    this.addForm = this.builder.group({
      storeName: new FormControl(null, [Validators.required]),
      memberId: new FormControl(null, [Validators.required]),
      storeDesc: new FormControl(null, [Validators.required])
    });
  }
  openAddProduct() {
    this.addModal.show();
    this.clearAddForm();
  }

  addProduct() {
    const newBox = this.addForm.value;
    this.productList.push(newBox);
    this.addModal.hide();
  }

  //delete methodu
  openDeleteProduct(Id: number) {
    this.deleteModal.show();
    this.Id = Id;
  }

  deleteProduct(Id: number) {
    for (var i = 0; i < this.productList.length; i++) {
      if (this.productList[i]['storeId'] == Id) {
        this.productList.splice(i, 1);
      }
    }
    this.deleteModal.hide();
  }

  //edit methodu
  openEditProduct(product: Product) {
    this.editModal.show();
    this.product = product;
    this.editForm.setValue({
      memberId: product.memberId,
      storeName: product.storeName,
      storeDesc: product.storeDesc
    });
  }

  editProduct(Id: number) {
    const newBox = this.editForm.value;
    for (var i = 0; i < this.productList.length; i++) {
      if (this.productList[i]['storeId'] == Id) {
        this.productList[i]['memberId'] = newBox.memberId;
        this.productList[i]['storeName'] = newBox.storeName;
        this.productList[i]['storeDesc'] = newBox.storeDesc;
      }
    }
    this.editModal.hide();
  }

  //detail 
  openDetailProduct(product: Product) {

    this.detailModal.show();
    this.product = product;
    this.selectedImage = product.storeLogoURL;
    this.detailForm.setValue({
      storeId: product.storeId,
      storeName: product.storeName,
      storeSlug: product.storeSlug,
      storeTitle: product.storeTitle,
      memberId: product.memberId,
      storeDesc: product.storeDesc,
      displayLogo: product.displayLogo,
      storeLogoURL: product.storeLogoURL
    });
  }

  detailProduct() {
    this.detailModal.hide();
  }

}
