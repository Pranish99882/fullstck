// tests/RegistrationForm.test.jsx
import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import RegistrationForm from '../src/components/RegistrationForm';

describe('RegistrationForm', () => {
  beforeEach(() => {
    render(<RegistrationForm />);
  });

  it('should render the registration form', () => {
    expect(screen.getByText('User Registration')).toBeInTheDocument();
  });

  it('should require username, email, password, and confirm password', async () => {
    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please enter all fields');
      
    });
  });

  it('should validate email format', async () => {
    const alertSpy = vi.spyOn(window, 'alert');
    
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email@go' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password' } });

    act(() => {
      fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Please enter a valid email address');
    });
  });

  it('should match passwords and submit the form successfully with valid inputs', async () => {
    const alertSpy = vi.spyOn(window, 'alert');

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password' } });

    act(() => {
      fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Form submitted successfully');
    });
  });

  it('should alert when passwords do not match', async () => {
    const alertSpy = vi.spyOn(window, 'alert');

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password1' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password2' } });

    act(() => {
      fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Passwords do not match');
    });
  });
});
