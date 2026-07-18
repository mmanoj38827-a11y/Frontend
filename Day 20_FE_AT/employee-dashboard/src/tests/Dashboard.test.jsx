import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Dashboard Module Test Cases', () => {
  test('TC_DASH_01: Verify Dashboard renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    const elements = screen.getAllByText(/Dashboard/i);
    if (elements.length > 0) fireEvent.click(elements[0]);
    expect(screen.getByText(/Welcome Back, Boss!/i)).toBeInTheDocument();
  });
});