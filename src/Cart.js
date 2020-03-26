import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component{
    constructor(){
        super();
        this.state={
            products:[
                {
                    id: 1,
                    price: 99,
                    title: 'Watch',
                    qty: 2,
                    img: ''
                },
                {
                    id: 2,
                    price: 999,
                    title: 'Phone',
                    qty: 1,
                    img: ''
                },
                {
                    id: 3,
                    price: 9999,
                    title: 'Laptop',
                    qty: 1,
                    img: ''
                }
            ]
        }
    }
    handelIncreaseQuantity=(product)=>{
        const {products}=this.state;
        const index=products.indexOf(product);

        products[index].qty+=1;

        this.setState({
            products:products
        })
    }
    handelDecreaseQuantity=(product)=>{
        const {products}=this.state;
        const index=products.indexOf(product);

        if(products[index].qty === 0)
            return;
        products[index].qty-=1;

        this.setState({
            products:products
        })
    }
    handelDeleteProduct=(id)=>{
        const {products}= this.state;

        const items=products.filter((item)=> item.id !== id);

        this.setState({
            products:items
        })
    }
    render(){
        const {products}=this.state;
        return(

            <div className='cart'>
                {products.map((product)=>{
                    return (
                        <CartItem 
                            product={product} 
                            key={product.id}
                            onIncreaseQuantity={this.handelIncreaseQuantity}
                            onDecreaseQuantity={this.handelDecreaseQuantity}
                            onDeleteProduct={this.handelDeleteProduct}
                        />
                    )
                })}
            </div>

        );
    }

}




export default Cart;