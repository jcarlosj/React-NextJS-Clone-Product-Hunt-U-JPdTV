import React from 'react';

/** Dependencies */
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

/** Define Style Component */
const Image = styled .img `
    width: 200px;
`;

const ProductDetail = ({ product }) => {

    const
        { id, name, companyName, productName, productUrl, productImageUrl, productDescription, comments, votes, creationDate } = product;

    return (
        <li>
            <section>
                <section>
                    <Image src={ productImageUrl } />
                </section>
            </section>
            <section>
                <h2>{ productName }</h2>
                <p>{ productDescription }</p>
                <section>
                    <img src="./static/images/comment.png" />
                    <p>{ comments .lenght } Comentarios</p>
                </section>
                <p>Publicado hace { formatDistanceToNow( new Date( creationDate ), { locale: es } ) }</p>
            </section>
            <section>
                <div> &#9650; </div>
                <p>{ votes }</p>
            </section>
        </li>
    );
}

export default ProductDetail;