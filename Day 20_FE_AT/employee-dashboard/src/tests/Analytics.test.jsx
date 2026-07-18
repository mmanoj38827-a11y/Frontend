import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Analytics Module Test Cases', () => {
  test('TC_ANALYTICS_01: Verify Analytics renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    const elements = screen.getAllByText(/Analytics/i);
    if (elements.length > 0) fireEvent.click(elements[0]);
    expect(screen.getByText(/Organization Analytics/i)).toBeInTheDocument();
  });
});