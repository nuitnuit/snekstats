import { render, screen } from '@testing-library/react';
import {Topbar} from './App';

test('renders learn react link', () => {
  render(<Topbar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
