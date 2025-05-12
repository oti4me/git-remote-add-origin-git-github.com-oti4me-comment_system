import { describe, it, expect, vi } from 'vitest';
import { Comments } from '../Comments';
import { renderComponentWithProviderAsync as renderComponentWithProvider } from '../../../utils/testUtils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Comments', () => {
  const mockComment = {
    id: '1',
    authorId: 'user1',
    postId: 'post1',
    parentId: null,
    content: 'Test comment content',
    createdAt: Date.now(),
    updatedAt: new Date().toISOString(),
    replies: [
      {
        id: '2',
        authorId: 'user2',
        postId: 'post1',
        parentId: '1',
        content: 'Test reply content',
        createdAt: Date.now(),
        updatedAt: new Date().toISOString()
      }
    ]
  };

  it('renders comment content', async () => {
    await renderComponentWithProvider(<Comments comment={mockComment} />);
    expect(screen.getByText(mockComment.content)).toBeInTheDocument();
  });

  it('shows reply button', async () => {
    await renderComponentWithProvider(<Comments comment={mockComment} />);
    expect(screen.getByText('Reply')).toBeInTheDocument();
  });

  it('toggles reply form on reply button click', async () => {
    await renderComponentWithProvider(<Comments comment={mockComment} />);

    await userEvent.click(screen.getByText('Reply'));
    expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByPlaceholderText('Add a comment...')).not.toBeInTheDocument();
  });

  it('shows delete button for authenticated users', async () => {
    await renderComponentWithProvider(<Comments comment={mockComment} />);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('handles expand/collapse of replies', async () => {
    await renderComponentWithProvider(<Comments comment={mockComment} />);

    const showRepliesButton = screen.getByText(/show 1 repl/i);
    expect(showRepliesButton).toBeInTheDocument();

    await userEvent.click(showRepliesButton);
    expect(screen.getByText('Test reply content')).toBeInTheDocument();
    expect(screen.getByText('Hide replies')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Hide replies'));
    expect(screen.queryByText('Test reply content')).not.toBeInTheDocument();
  });

  it('handles comment deletion', async () => {
    const deleteComment = vi.fn();
    vi.mock('../../../serviceLayer/hooks/deleteComment.tsx', () => ({
      useDeleteComment: () => ({ deleteComment })
    }));

    await renderComponentWithProvider(<Comments comment={mockComment} />);

    await userEvent.click(screen.getByText('Delete'));
    expect(deleteComment).toHaveBeenCalledWith(mockComment.id);
  });
});
