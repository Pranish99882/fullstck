// tests/UserListing.test.jsx

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserListing from '../src/components/UserListing';
import { BrowserRouter as Router } from 'react-router-dom';

describe('UserListing Component', () => {
  const mockUsers = [
    { id: 1, name: 'john_doe', email: 'john@example.com', phone: '8294555667' },
    { id: 2, name: 'jane_doe', email: 'jane@example.com', phone: '8294555667' },
  ];

  beforeEach(() => {
    render(
      <Router>
        <UserListing users={mockUsers} />
      </Router>
    );
  });

  it('should render the user listing table with mocked data', () => {
    expect(screen.getByText('User Listing')).toBeInTheDocument();
    expect(screen.getByText('john_doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('8294567')).toBeInTheDocument();
    expect(screen.getByText('jane_doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('8294555667')).toBeInTheDocument();
  });

  it('should delete a user when delete button is clicked', () => {
    const deleteButton = screen.getAllByText('Delete')[0]; // Assuming 'Delete' text is used for delete button
    fireEvent.click(deleteButton);

    // After deletion, the user should not be in the DOM
    expect(screen.queryByText('john_doe')).toBeNull();
    expect(screen.queryByText('john@example.com')).toBeNull();
    expect(screen.queryByText('8294567')).toBeNull();

    // Check that the second user is still in the DOM after the first one is deleted
    expect(screen.getByText('jane_doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('8294555667')).toBeInTheDocument();
  });

  // Add more test cases as needed for edit functionality
});
