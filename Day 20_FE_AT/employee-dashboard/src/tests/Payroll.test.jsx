import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Payroll Module Test Cases', () => {
  test('TC_PAY_01: Verify Payroll renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    const elements = screen.getAllByText(/Payroll/i);
    if (elements.length > 0) fireEvent.click(elements[0]);
    expect(screen.getByText(/Payroll Processing/i)).toBeInTheDocument();
  });
});