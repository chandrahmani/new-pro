import { render, screen } from '@testing-library/react';
import User from './User';

describe('User', () => {
  it('renders User Us heading and team members', () => {
    render(<User />);
    expect(screen.getByRole('heading', { name: /user us/i })).toBeInTheDocument();
    expect(screen.getByText(/welcome to our company/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /meet our team/i })).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
