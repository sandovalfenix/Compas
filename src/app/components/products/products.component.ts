import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //variable de productos
  listProducts: any = [] = [
    {name: 'Product_1', price: 85000, quantity: 10}
  ];
  //propiedad para formularios
  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) { 
    //declaracion de formulario
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  //funciones nuevas
  addProduct(){
    //valores del formulario 
    const product: any = {
      name: this.form.get('name')?.value,
      price: this.form.get('price')?.value,
      quantity: this.form.get('quantity')?.value
    }
    this.listProducts.push(product)
    this.toastr.success('Formulario Completado', 'Registro Guardado');
    this.form.reset()
  }

  deletedProduct(item: object){
    let index = this.listProducts.indexOf(item)
    this.listProducts.splice(index, 1)
    this.toastr.error('El registro fue eliminado con exito', 'Producto Eliminado')
  }
}
