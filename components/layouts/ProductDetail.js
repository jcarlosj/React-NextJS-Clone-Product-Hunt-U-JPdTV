import React from 'react';

const ProductDetail = ({ product }) => {

    const
        { id, name, companyName, productName, productUrl, productImageUrl, productDescription, comments, votes, creationDate } = product;

    return (
        <li>{ productName }</li>
    );
}

export default ProductDetail;