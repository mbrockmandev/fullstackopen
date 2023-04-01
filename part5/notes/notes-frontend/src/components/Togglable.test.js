import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel='show...'>
        <div className='testDiv'>togglable content</div>
      </Togglable>,
    ).container;
  });

  test('should render its children', async () => {
    await screen.findAllByText('togglable content');
  });

  test('should not display children at the start', () => {
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('should display children after clicking button', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('should close content when toggle btn pressed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const closeButton = screen.getByText('Cancel');
    await user.click(closeButton);

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
