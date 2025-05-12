import { describe, it, expect, vi } from 'vitest';
import { CommentCount } from '../CommentCount';
import { renderComponentWithProvider } from '../../../utils/testUtils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CommentCount', () => {
  it('renders the comment count', () => {
    renderComponentWithProvider(<CommentCount count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    renderComponentWithProvider(<CommentCount count={3} onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
