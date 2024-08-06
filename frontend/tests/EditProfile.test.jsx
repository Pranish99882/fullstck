import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditProfile from '../src/components/EditProfileForm';

describe('EditProfile component', () => {
  test('renders Edit Profile header', () => {
    render(<EditProfile />);

    const headerElement = screen.getByText(/Edit Profile/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('allows user to enter username', () => {
    render(<EditProfile />);

    const usernameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    expect(usernameInput.value).toBe('John Doe');
  });

  test('allows user to enter email', () => {
    render(<EditProfile />);

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(emailInput.value).toBe('john.doe@example.com');
  });

  test('allows user to enter phone number', () => {
    render(<EditProfile />);

    const phoneInput = screen.getByLabelText(/Phone Number/i);
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    expect(phoneInput.value).toBe('1234567890');
  });

  test('allows user to enter new password', () => {
    render(<EditProfile />);
    
    // const newPasswordInput = screen.getByLabelText(/New Password/i, { selector: 'input' });  //Found multiple elements with the text of: /New Password/i
    const newPasswordInput = screen.getByTestId('new-password-input');
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    expect(newPasswordInput.value).toBe('newPassword123');
  });

  test('allows user to confirm new password', () => {
    render(<EditProfile />);

    const confirmPasswordInput = screen.getByLabelText(/Confirm New Password/i, { selector: 'input' });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });
    expect(confirmPasswordInput.value).toBe('newPassword123');
  });

  test('submits the form with correct data', () => {
    render(<EditProfile />);

    const usernameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const phoneInput = screen.getByLabelText(/Phone Number/i);
    const newPasswordInput = screen.getByTestId('new-password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-new-password-input');
    const saveButton = screen.getByText(/Save Changes/i);

    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });

    fireEvent.click(saveButton);

    // Replace with actual expected assertion or check console log output
    // Example: expect(console.log).toHaveBeenCalledWith('Form submitted:', { username: 'John Doe', email: 'john.doe@example.com', phone: '1234567890', newPassword: 'newPassword123', confirmNewPassword: 'newPassword123' });
  });
});
