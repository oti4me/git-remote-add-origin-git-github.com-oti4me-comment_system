import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommentInput } from '../CommentInput';
import { renderComponentWithProvider } from '../../../utils/testUtils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CommentInput', () => {
  const mockOnSubmit = vi.fn();
  const mockOnClear = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with placeholder text', () => {
    renderComponentWithProvider(<CommentInput />);
    expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument();
  });

  it('handles comment submission', async () => {
    renderComponentWithProvider(
      <CommentInput onSubmit={mockOnSubmit} />
    );

    const textarea = screen.getByPlaceholderText('Add a comment...');
    await userEvent.type(textarea, 'Test comment');

    const submitButton = screen.getByText('Comment');
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('Test comment');
  });

  it('disables submit button when comment is empty', () => {
    renderComponentWithProvider(
      <CommentInput onSubmit={mockOnSubmit} />
    );

    expect(screen.getByText('Comment')).toBeDisabled();
  });

  it('clears input on clear button click', async () => {
    renderComponentWithProvider(
      <CommentInput onSubmit={mockOnSubmit} onClear={mockOnClear} />
    );

    const textarea = screen.getByPlaceholderText('Add a comment...');
    userEvent.type(textarea, 'Test comment');

    const clearButton = screen.getByText('Clear');
    await userEvent.click(clearButton);

    expect(mockOnClear).toHaveBeenCalled();
    expect(textarea).toHaveValue('');
  });

  it('shows cancel instead of clear button for sub-comments', () => {
    renderComponentWithProvider(
      <CommentInput isSubComment onClear={mockOnClear} />
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });

  it('handles textarea height adjustment', async () => {
    renderComponentWithProvider(<CommentInput />);

    const textarea = screen.getByPlaceholderText('Add a comment...');
    const longText = 'A'.repeat(200);
    await userEvent.type(textarea, longText);

    // The textarea should adjust its height
    expect(textarea.style.height).not.toBe('auto');
  });
});
