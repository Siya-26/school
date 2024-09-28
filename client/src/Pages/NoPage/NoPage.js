import React from 'react';
import styled from 'styled-components';
import witsImage from '../../images/wits.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f0f0;
  padding: 2rem;
`;

const Image = styled.img`
  max-width: 50%;
  max-height: 50%;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  transform: rotate(-5deg);
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #777;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: #333;
  color: #fff;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #555;
    transform: translateY(-3px);
  }
`;

const NoPage = () => {
  return (
    <Container>
      <Image src={witsImage} alt="404 Illustration" />
      <Title>Oops! Page Not Found</Title>
      <Subtitle>We can't seem to find the page you're looking for.</Subtitle>
      <Button onClick={() => window.location.href = '/'}>Go Back Home</Button>
    </Container>
  );
};

export default NoPage;
