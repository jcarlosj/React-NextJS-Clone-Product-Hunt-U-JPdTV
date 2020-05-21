import React from 'react';
import Link from 'next/link';

/** Dependencies */
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

/** Define Style Component */
const
    List = styled .li `
        align-items: center;
        border-button: 1px solid #E1E1E1;
        display: flex;
        justify-content: space-between;
        padding: 4rem;
    `,
    Title = styled .a `
        font-size: 2rem;
        font-weight: bold;
        margin: 0;

        :hover {
            cursor: pointer;
        }
    `,
    Product = styled .section `
        column-gap: 2rem;
        display: grid;
        flex: 0 1 600px;    // Se hace por que el padre posee es un display: flex
        grid-template-columns: 1fr 3fr;
    `,
    Descripcion = styled .p `
        color: #888;
        font-size: 1.6rem;
        margin: 0;
    `,
    Comments = styled .div `
        align-items: center;
        display: flex;
        margin-top: 2rem;

        div {
            align-items: center;
            border: 1px solid #E1E1E1;
            display: flex;
            margin-right: 2rem;
            padding: .3rem 1rem;

            img {
                margin-right: 2rem;
                width: 2rem;
            }
            p {
                font-size: 1.6rem;
                margin-right: 1rem;
                font-weight: 700;
                &:last-of-type {
                    margin: 0;
                }
            }
        }
    `,
    Votes = styled .section `
        border: 1px solid #E1E1E1;
        flex: 0 0 auto;
        padding: 1rem 3rem;
        text-align: center; 

        div {
            font-size: 2rem;
        }
        p {
            font-size: 2rem;
            font-weight: 700;
            margin: 0;
        }
    `,
    Image = styled .img `
        width: 200px;
    `;

const ProductDetail = ({ product }) => {

    const
        { id, name, companyName, productName, productUrl, productImageUrl, productDescription, comments, votes, creationDate } = product;

    return (
        <List>

            <Product>
                <div>
                    <Image src={ productImageUrl } />
                </div>
                <section>
                    <Link
                        href="/products/[id]" as={ `/products/${ id }` }        // Enrutamiento dinámico con Next
                    >
                        <Title>{ productName }</Title>
                    </Link>
                    <p>{ productDescription }</p>
                    <Comments>
                        <div>
                            <img src="./static/images/comment.png" />
                            <Descripcion>{ comments .length } Comentarios</Descripcion>
                        </div>
                    </Comments>
                </section>
                <p>Publicado hace { formatDistanceToNow( new Date( creationDate ), { locale: es } ) }</p>
            </Product>

            <Votes>
                <div> &#9650; </div>
                <p>{ votes }</p>
            </Votes>
            
        </List>
    );
}

export default ProductDetail;