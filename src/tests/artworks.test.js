import { describe, it, expect } from 'jest';
import { render, fireEvent } from '@testing-library/react';
import LogoutButton from '../LogoutButton';

describe('LogoutButton Component', () => {
  it('logs out the user when clicked', () => {
    const setIsLoggedIn = jest.fn();
    const { getByText } = render(<LogoutButton setIsLoggedIn={setIsLoggedIn} />);

    fireEvent.click(getByText('Logout'));

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(setIsLoggedIn).toHaveBeenCalledWith(false);
  });

  it('does something else', () => {
    // Another test case
  });

  // More test cases...
});

