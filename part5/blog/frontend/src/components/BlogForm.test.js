import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('BlogForm Component Tests', () => {
  let blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'mike',
    },
  };

  let mockAddBlog = jest.fn(blog);

  test('should call the event handler with correct details when new blog is created', () => {
    const { title, author, url } = blog;
    let mockSetTitle = jest.fn(title);
    let mockSetAuthor = jest.fn(author);
    let mockSetUrl = jest.fn(url);

    const component = render(
      <BlogForm
        onAddBlog={mockAddBlog}
        setTitle={mockSetTitle}
        setAuthor={mockSetAuthor}
        setUrl={mockSetUrl}
        title={title}
        author={author}
        url={url}
      />,
    );

    const inputTitle = component.getByDisplayValue(title);
    const inputAuthor = component.getByDisplayValue(author);
    const inputUrl = component.getByDisplayValue(url);

    expect(inputTitle).toBeInTheDocument();
    expect(inputAuthor).toBeInTheDocument();
    expect(inputUrl).toBeInTheDocument();

  });
});
