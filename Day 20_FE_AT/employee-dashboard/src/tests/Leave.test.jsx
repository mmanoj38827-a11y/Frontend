import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Leave Module Test Cases', () => {
  test('TC_LEAVE_01: Verify Leave module renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    
    const leaveElements = screen.getAllByText(/Leave Mgmt/i);
    if (leaveElements.length > 0) {
      fireEvent.click(leaveElements[0]);
    }
    
    expect(screen.getByText(/Leave Management/i)).toBeInTheDocument();
  });
});