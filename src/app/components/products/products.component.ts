import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api/api.service';
import { ProductInterface } from 'src/app/models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  listProducts: ProductInterface[] = []; //variable de productos
  ProductsForm: FormGroup; //propiedad para formularios
  editMode: boolean = false; //modificacion de diseño al editar

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    //declaracion de formulario
    this.ProductsForm = this.fb.group({
      id_product: [Math.floor(Math.random() * 999) + 100],
      name_product: ['', Validators.required],
      price_product: ['', Validators.required],
      quantity_product: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //liberacion de lista productos por medio webApi
    this.api.getProducts().subscribe((data) => {
      this.listProducts = data;
    });
  }

  //Añadir producto
  addProduct(product: ProductInterface) {
    //valores del formulario
    if (this.editMode) {
      this.api.updateProduct(product).subscribe((data) => {
        console.log(data);
      });
      let index = this.listProducts.findIndex(
        (item) => item.id_product === product.id_product
      );
      this.listProducts.splice(index, 1, product);
    } else {
      this.api.newProducts(product).subscribe((data) => {
        console.log(data);
      });;
      this.listProducts.push(product);
    }

    this.toastr.success(
      'La accion fue realizada satisfactoriamente',
      'Formulario Completado'
    );
    this.resetFormProduct();
  }

  //Editar producto
  editProduct(product: ProductInterface) {
    //activar diseño Editar
    this.editMode = true;
    //rellenar formulario
    this.ProductsForm = this.fb.group({
      id_product: [product.id_product, Validators.required],
      name_product: [product.name_product, Validators.required],
      price_product: [product.price_product, Validators.required],
      quantity_product: [product.quantity_product, Validators.required],
    });
  }

  //Eliminar producto
  deletedProduct(product: any) {
    this.api.deleteProduct(product).subscribe((data) => {
      console.log(data)
    })
    let index = this.listProducts.indexOf(product);
    this.listProducts.splice(index, 1);
    this.toastr.error(
      'El registro fue eliminado con exito',
      'Producto Eliminado'
    );
  }

  //vaciar formulario
  resetFormProduct() {
    this.ProductsForm.reset();
    this.editMode = false;
  }
}
