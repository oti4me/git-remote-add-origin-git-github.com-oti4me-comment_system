import { describe, it, expect } from 'vitest';
import { Author } from '../Author';
import { renderComponentWithProvider } from '../../../utils/testUtils';
import { screen } from '@testing-library/react';

describe('Author', () => {
  const mockAuthor = "John Doe";
  const mockTimestamp = new Date().toISOString();

  it('renders author name', () => {
    renderComponentWithProvider(
      <Author author={mockAuthor} timestamp={mockTimestamp} />
    );
    expect(screen.getByText(mockAuthor)).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    renderComponentWithProvider(
      <Author author={mockAuthor} timestamp={mockTimestamp} />
    );

    const timeElement = screen.getByRole('time');
    expect(timeElement).toHaveAttribute('datetime', mockTimestamp);
  });

  it('includes user icon', () => {
    renderComponentWithProvider(
      <Author author={mockAuthor} timestamp={mockTimestamp} />
    );

    // CircleUserRound icon should be present
    const iconContainer = screen.getByTestId('author-icon');
    expect(iconContainer).toBeInTheDocument();
  });

  it('displays author name in an address element', () => {
    renderComponentWithProvider(
      <Author author={mockAuthor} timestamp={mockTimestamp} />
    );

    const addressElement = screen.getByText(mockAuthor).closest('address');
    expect(addressElement).toBeInTheDocument();
    expect(addressElement).toHaveClass('text-sm', 'font-medium', 'text-gray-900', 'not-italic');
  });
});
