import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<LoadingSpinner label="Custom loading..." />);
    expect(screen.getByText('Custom loading...')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByLabelText('Loading');
    expect(spinner).toHaveClass('w-16 h-16');
  });
});