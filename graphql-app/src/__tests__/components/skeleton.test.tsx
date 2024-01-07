import { render, screen } from '@testing-library/react';
import Skeleton from '@/components/skeleton/skeleton';

describe('skeleton', () => {
  it('should render correctly', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});
