import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Attendance Module Test Cases', () => {
  test('TC_ATT_01: Verify Attendance renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    const elements = screen.getAllByText(/Attendance/i);
    if (elements.length > 0) fireEvent.click(elements[0]);
    expect(screen.getByText(/Attendance Tracking/i)).toBeInTheDocument();
  });
});