// import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
// import { render, fireEvent } from '@testing-library/react';
// import Blog from './Blog';

// describe('blog component tests', () => {
//   let blog = {
//     title: 'React Patterns',
//     author: 'Michael Chan',
//     url: 'https://reactpatterns.com',
//     likes: 7,
//   };

//   let mockDeleteBlog = jest.fn();

//   test('should render title and author', () => {
//     const component = render(
//       <Blog
//         blog={blog}
//         onDelete={mockDeleteBlog}
//       />,
//     );
//     expect(component.container).toHaveTextContent(
//       'React Patterns -- Michael Chan',
//     );
//   });

//   test('should display url and likes when clicking details button', () => {
//     const component = render(<Blog onDelete={mockDeleteBlog} />);
//     const button = component.getByText('View Details');
//     fireEvent.click(button);

//     expect(component.container).toHaveTextContent('https://reactpatterns.com');
//     expect(component.container).toHaveTextContent('7');
//   });
// });
