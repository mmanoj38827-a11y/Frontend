import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Scheduling Module Test Cases', () => {
  test('TC_SCHED_01: Verify Scheduling renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    const elements = screen.getAllByText(/Shifts/i);
    if (elements.length > 0) fireEvent.click(elements[0]);
    expect(screen.getByText(/Shift Scheduling/i)).toBeInTheDocument();
  });
});