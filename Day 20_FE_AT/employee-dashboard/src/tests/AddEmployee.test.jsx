import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Add Employee Module Test Cases', () => {
  test('TC_ADD_01: Verify Add Employee module renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    
    const addElements = screen.getAllByText(/Add Employee/i);
    if (addElements.length > 0) {
      fireEvent.click(addElements[0]);
    }
    
    expect(screen.getByText(/Add New Employee/i)).toBeInTheDocument();
  });
});