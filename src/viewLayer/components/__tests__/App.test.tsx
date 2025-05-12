import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { renderComponentWithProviderAsync as renderComponentWithProvider } from '../../../utils/testUtils';
import { screen } from '@testing-library/react';

// Mock the usePosts hook
vi.mock('../../../serviceLayer/hooks', () => ({
  usePosts: vi.fn(),
  useComments: vi.fn(),
  useAddComment: vi.fn(),
}));

import { usePosts, useComments, useAddComment } from '../../../serviceLayer/hooks';

describe('App', () => {
  it('shows loading state', async () => {
    vi.mocked(usePosts).mockReturnValue({
      posts: [],
      loading: true,
      error: null
    });

    await renderComponentWithProvider(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    const testError = new Error('Test error');
    vi.mocked(usePosts).mockReturnValue({
      posts: [],
      loading: false,
      error: testError
    });

    await renderComponentWithProvider(<App />);
    expect(screen.getByText(/Error:/)).toBeInTheDocument();
  });

  it('shows no posts message when posts array is empty', async () => {
    vi.mocked(usePosts).mockReturnValue({
      posts: [],
      loading: false,
      error: null
    });

    await renderComponentWithProvider(<App />);
    expect(screen.getByText('No post created yet!')).toBeInTheDocument();
  });

  it('renders first post when posts exist', async () => {
    console.log(usePosts(), 'Rendering first post');
    console.log(useComments, 'Rendering first post');
    vi.mocked(useComments).mockReturnValue({
      comments: [],
      loading: true
    });

    vi.mocked(useAddComment).mockReturnValue({
      addComment: vi.fn(),
      loading: true,
      error: null
    });

    const mockPost = {
      id: '1',
      title: 'Test Post',
      content: 'Test content',
      authorId: 'author1',
      likeCount: 0,
      commentCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    vi.mocked(usePosts).mockReturnValue({
      posts: [mockPost],
      loading: false,
      error: null
    });

    const { debug } = await renderComponentWithProvider(<App />);

    debug();

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
