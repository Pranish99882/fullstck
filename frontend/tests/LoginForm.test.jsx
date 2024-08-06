// tests/LoginForm.test.jsx
import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LoginForm from '../src/components/LoginForm';

describe('LoginForm', () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it('should render the login form', () => {
    expect(screen.getByText('User Login')).toBeInTheDocument();
  });

  it('should require email and password', async () => {
    fireEvent.click(screen.getByText('Login'));
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Email is required');
    });
  });

  it('should validate email format', async () => {
    const alertSpy = vi.spyOn(window, 'alert');

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email@go' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

    act(() => {
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Please enter a valid email address');
    });
  });

  it('should submit the form successfully with valid inputs', async () => {
    const alertSpy = vi.spyOn(window, 'alert');

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

    act(() => {
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Form submitted successfully');
    });
  });
});
