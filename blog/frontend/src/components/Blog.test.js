import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Blog component tests', () => {
  let blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'mike',
    },
  };

  let mockOnLike = jest.fn();
  let mockOnDelete = jest.fn();

  test('renders title and author', () => {
    const component = render(
      <Blog
        blog={blog}
        onLike={mockOnLike}
        onDelete={mockOnDelete}
      />,
    );

    const divContainer = component.container.querySelector('.title-author');

    expect(divContainer).toHaveTextContent('React patterns -- Michael Chan');
  });

  test('clicking the view button displays url and number of likes', () => {
    const component = render(
      <Blog
        blog={blog}
        onLike={mockOnLike}
        onDelete={mockOnDelete}
      />,
    );

    const button = component.getByText('View Details');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent('https://reactpatterns.com/');

    expect(component.container).toHaveTextContent('7');
  });

  test('clicking the view details button twice shows then hides url and number of likes', () => {
    const component = render(
      <Blog
        blog={blog}
        onLike={mockOnLike}
        onDelete={mockOnDelete}
      />,
    );

    const button = component.getByText('View Details');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent('https://reactpatterns.com/');

    expect(component.container).toHaveTextContent('7');

    fireEvent.click(button);

    expect(component.container).not.toHaveTextContent(
      'https://reactpatterns.com/',
    );

    expect(component.container).not.toHaveTextContent('7');
  });
});
