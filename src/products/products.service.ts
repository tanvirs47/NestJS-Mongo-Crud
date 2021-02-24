import { Injectable, NotFoundException} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from './product.model'
import { from } from 'rxjs';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel : Model <Product>){

    }
    async insertProduct(title:string, desc: string, price:number){
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        })
        const result = await newProduct.save()
        //console.log(result)
        return result.id as string; 
    }

    async getProducts(){
        const products = await this.productModel.find().exec()
        return products.map(prod=>({
            id:prod.id,
            title:prod.title,
            description:prod.description,
            price:prod.price
        }));
    }

    private async findProduct(id:string): Promise<Product>{
        let product;
        try{
            product = await this.productModel.findById(id).exec()
        }catch(err){
            throw new NotFoundException('Could not find product.')
        }
        if(!product){
            throw new NotFoundException('Could not find product.')
        }
        return product;
    }

    async getSingleProduct(productId:string){
        const product = await this.findProduct(productId)
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        };
    }

   async updateProduct(productId:string, title:string, desc:string, price:number){
    
        const updateProduct =  await this.findProduct(productId)
        if(title){
            updateProduct.title = title;
        }
        if(desc){
            updateProduct.description = desc
        }
        if(price){
            updateProduct.price = price
        }
       updateProduct.save()
    }

    async deleteProduct(prodId:string){
        const result = await this.productModel.deleteOne({_id:prodId}).exec();
        if(result.n === 0){
            throw new NotFoundException('Could not find product.')
        }
    }
}