import styled from '@emotion/styled';                       // Dependency
import MainLayout from '../components/layouts/MainLayout';  // Component

/** Define Style Components */
const Heading = styled .h1 `
    background-color: green;
    color: white;
    margin: 0;
    padding: .5rem 1rem;
    text-align: center;
`;

export default function Home() {
  return (
    <div className="container">
        <MainLayout>
            <Heading>
                Inicio
            </Heading>
        </MainLayout>
    </div>
  )
}
