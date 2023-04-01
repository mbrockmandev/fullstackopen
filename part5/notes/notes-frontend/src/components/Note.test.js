import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const mockHandler = jest.fn();

  render(
    <Note
      note={note}
      toggleImportance={mockHandler}
    />,
  );

  const user = userEvent.setup();
  const button = screen.getByText('make unimportant');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});