import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component{

  constructor(){
    super();
    this.state={
        products:[
            {
                id: 1,
                price: 99,
                title: 'Watch',
                qty: 2,
                img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
            },
            {
                id: 2,
                price: 999,
                title: 'Phone',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1525598912003-663126343e1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
            },
            {
                id: 3,
                price: 9999,
                title: 'Laptop',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
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
  getCartCount=()=>{
    const {products}=this.state;
    let count=0;
    products.forEach((product)=>{
      count+=product.qty;
    });
    return count;
  }
  getCartTotal=()=>{
    const {products}=this.state;
    let total=0;
    products.forEach((product)=>{
      total=total+(product.price * product.qty);
    });
    return total;
  }
  render(){
    const {products}=this.state;
    return (
      <div className="App">
        <Navbar
          count={this.getCartCount()}
        />
        <h1>Cart</h1>
        <Cart
          products={products}
          onIncreaseQuantity={this.handelIncreaseQuantity}
          onDecreaseQuantity={this.handelDecreaseQuantity}
          onDeleteProduct={this.handelDeleteProduct}
        />
        <div style={{fontSize:20, padding:10}}>Total: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
