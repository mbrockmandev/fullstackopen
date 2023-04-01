import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('should render title and author but NOT url or likes by default', async () => {
  const mockBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 5,
    user: {
      username: 'mike',
      name: 'mike!',
      id: '6424d92f387e05e6c8d3342e',
    },
    id: '5a422ba71b54a676234d17fb',
  };

  const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpZCI6IjY0MjRkOTJmMzg3ZTA1ZTZjOGQzMzQyZSIsImlhdCI6MTY4MDI2MjY5OCwiZXhwIjoxNjgwMjczNDk4fQ.qg0XPQM_EWUepVosCb2nt7vOUERz4-FFGXSdw_mvvik';

  const mockOnDelete = () => {};

  const { container } = render(
    <Blog
      blog={mockBlog}
      token={mockToken}
      onDelete={mockOnDelete}
    />,
  );
  const div = container.querySelector('.title-author-container');
  expect(div).toBeDefined();

  const notVisibleDiv = container.querySelector('.url-likes-container');
  expect(notVisibleDiv).not.toBeDefined();
});
