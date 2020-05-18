import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';                       // Dependency
import MainLayout from '../components/layouts/MainLayout';  // Component
import { FirebaseContext } from '../firebase';

export default function Home() {

    const
        [ products, setProducts ] = useState( [] ),     // Define State 'products'
        { firebase } = useContext( FirebaseContext );   // Extract Context

    /** Traking */
    useEffect( () => {
        /** Consultar API de Firebase cuando el componente cargue */
        const getProducts = () => {
            firebase .db .collection( 'products' ) 
                         .orderBy( 'creationDate', 'desc' )
                         .onSnapshot( handleSnapShot );         // Permite acceder a los datos consultados
        }
        getProducts();
    }, [] );

    /** Manejador de Datos Consultados en FireBase */
    const handleSnapShot = snapshot  => {
        const products = snapshot .docs .map( document => {
            return {
                id: document .id,
                ...document .data()      // Get data
            }
        });

        console .log( 'Products', products );
        setProducts( products );        // Update State 
    }

    return (
        <MainLayout>
            <h1>Inicio</h1>
        </MainLayout>
    )
}
