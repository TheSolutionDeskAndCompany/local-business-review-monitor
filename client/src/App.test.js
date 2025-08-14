import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders skip to content link', () => {
  render(<App />);
  const linkElement = screen.getByText(/skip to content/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', '#main');
});
