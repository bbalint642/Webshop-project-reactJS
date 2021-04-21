import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">Lófasz sincs a kosaradban!
            <Link to="/" className={classes.link}> Na gyorsan szórj valamit bele</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}> 
                    <Typography variant="h4">Ennyi pénzt fogsz elbaszni: {cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="primary" onClick={handleEmptyCart}>Bassz ki mindent a gecibe</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Vedd el a pénzem</Button>
                    </div>
            </div>
        </>
    );

    if(!cart.line_items) return 'Loading...';
    
    return (
        <Container>
            <div className={classes.toolbar} /> 
            <Typography className={classes.title} variant="h3" gutterBottom>Ezek itt a szarjaid</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
