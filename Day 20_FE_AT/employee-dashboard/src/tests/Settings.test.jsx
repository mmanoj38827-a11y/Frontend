import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Settings Module Test Cases', () => {
  test('TC_SET_01: Verify Settings renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    const elements = screen.getAllByText(/Settings/i);
    if (elements.length > 0) fireEvent.click(elements[0]);
    expect(screen.getByText(/System Settings/i)).toBeInTheDocument();
  });
});