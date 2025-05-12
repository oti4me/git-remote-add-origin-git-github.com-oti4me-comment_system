import { describe, it, expect } from 'vitest';
import { Likes } from '../Likes';
import { renderComponentWithProvider } from '../../../utils/testUtils';
import { screen } from '@testing-library/react';

describe('Likes', () => {
  it('renders like count', () => {
    renderComponentWithProvider(<Likes upvotes={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders thumbs up icon', () => {
    renderComponentWithProvider(<Likes upvotes={0} />);
    const wrapper = screen.getByText('0').parentElement;
    expect(wrapper?.querySelector('svg')).toBeInTheDocument();
  });

  it('handles zero upvotes', () => {
    renderComponentWithProvider(<Likes upvotes={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    renderComponentWithProvider(<Likes upvotes={1} />);
    const countElement = screen.getByText('1');
    expect(countElement).toHaveClass('text-sm', 'font-semibold', 'text-gray-700');
  });

  it('wraps content in IconWrapper', () => {
    renderComponentWithProvider(<Likes upvotes={1} />);
    const wrapper = screen.getByText('1').parentElement;
    expect(wrapper).toHaveClass('flex', 'items-center', 'justify-center', 'gap-1');
  });
});
