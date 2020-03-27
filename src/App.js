import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';
class App extends React.Component{

	constructor(){
		super();
		this.state={
			products:[],
			loading: true
		}
		this.db=firebase.firestore();
	}
	componentDidMount(){
		// firebase
		// 	.firestore()
		// 	.collection('products')
		// 	.get()
		// 	.then((snapshot)=>{
				
		// 		const products=snapshot.docs.map((doc)=>{
		// 			const data=doc.data();
		// 			data['id']=doc.id;
		// 			return data;
		// 		})
		// 		this.setState({
		// 			products: products,
		// 			loading:false
		// 		});
		// 	});
		firebase
			.firestore()
			.collection('products')
			.onSnapshot((snapshot)=>{//for real time
				
				const products=snapshot.docs.map((doc)=>{
					const data=doc.data();
					data['id']=doc.id;
					return data;
				})
				this.setState({
					products: products,
					loading:false
				});
			})
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
	addProduct=()=>{
		this.db
			.collection('products')
			.add({
				img: '',
				price: 10000,
				qty: 1,
				title: 'washing mechine'
			})
			.then((docRef)=>{
				console.log(docRef);
			})
			.catch((error)=>{
				console.log(error);
			})
	}
	render(){
		const {products, loading}=this.state;
		return (
		<div className="App">
			<Navbar
			count={this.getCartCount()}
			/>
			<h1>Cart</h1>
			<button style={{padding:20, fontSize:20}} onClick={this.addProduct}>Add Product</button>
			<Cart
			products={products}
			onIncreaseQuantity={this.handelIncreaseQuantity}
			onDecreaseQuantity={this.handelDecreaseQuantity}
			onDeleteProduct={this.handelDeleteProduct}
			/>
			{loading && <h1>Loading Products...</h1>}
			<div style={{fontSize:20, padding:10}}>Total: {this.getCartTotal()}</div>
		</div>
		);
	}
}

export default App;
