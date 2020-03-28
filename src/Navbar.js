import React from 'react';
// import { findByLabelText } from '@testing-library/react';

const Navbar=(props)=>{
    return(
        <div style={styles.nav}>
			<div style={styles.appName}>
				<img style={styles.logo} alt="cart-logo" src="https://image.flaticon.com/icons/svg/1069/1069102.svg" />
				<h1>Cart App</h1>
			</div>
            <div style={styles.cartIconContainer}>
                <img style={styles.cartIcon} alt="cart-icon" src="https://image.flaticon.com/icons/svg/1170/1170678.svg" />
    			<span style={styles.cartCount}>{props.count}</span>
            </div>
        </div>
    ); 
};

const styles = {
	logo:{
		width:50,
		marginRight:10
	},
	appName:{
		display: 'flex',
		marginLeft: 10,
		color:'white'
	},
    cartIcon: {
		height: 32,
		marginRight: 20
    },
    nav: {
		height: 70,
		background: '#4267b2',
		display: 'flex',
		alignItems: 'center'
    },
    cartIconContainer: {
		position: 'relative',
		marginRight: 10,
		// justifyContent: 'flex-end',
		marginLeft: 'auto',
    },
    cartCount: {
		background: 'yellow',
		borderRadius: '50%',
		padding: '2px 8px',
		position: 'absolute',
		right: 0,
		top: -9
    }
};

export default Navbar;