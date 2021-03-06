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
			//.where('price','>=',123) //for quaring data
			//.where('title','==','Coffee Mug')
			.orderBy('price',"asc") //in assending order of price
			//.orderBy('price',"desc") //in descending order of price
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

		// products[index].qty+=1;

		// this.setState({
		// 	products:products
		// })
		const docRef=this.db.collection('products').doc(products[index].id);

		docRef
			.update({
				qty: products[index].qty+1
			})
			.then(()=>{
				console.log("Updated Sucessfully! +1");
			})
			.catch((error)=>{
				console.log(error);
			})
	}
	handelDecreaseQuantity=(product)=>{
		const {products}=this.state;
		const index=products.indexOf(product);

		if(products[index].qty === 0)
			return;
		// products[index].qty-=1;

		// this.setState({
		// 	products:products
		// })
		const docRef=this.db.collection('products').doc(products[index].id);

		docRef
			.update({
				qty: products[index].qty-1
			})
			.then(()=>{
				console.log("Updated Sucessfully! -1");
			})
			.catch((error)=>{
				console.log(error);
			})

	}
	handelDeleteProduct=(id)=>{
		// const {products}= this.state;

		// const items=products.filter((item)=> item.id !== id);

		// this.setState({
		// 	products:items
		// })
		const docRef=this.db.collection('products').doc(id);
		docRef
			.delete()
			.then(()=>{
				console.log("Item Deleted Sucessfully!");
			})
			.catch((error)=>{
				console.log(error);
			})
	}
	getCartCount=()=>{
		const {products}=this.state;
		let num=0;
		products.forEach((product)=>{
			num+=product.qty;
		});
		return num;
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
			{/* Add Product Button Disabled */}
			{/* <button style={{padding:20, fontSize:20}} onClick={this.addProduct}>Add Product</button> */}
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
