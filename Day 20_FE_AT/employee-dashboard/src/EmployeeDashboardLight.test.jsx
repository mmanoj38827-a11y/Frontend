import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from './EmployeeDashboardLight';

describe('EmployeeDashboardLight Main Integration Tests', () => {
  test('TC_MAIN_01: Verify dashboard component renders successfully', () => {
    const { container } = render(<EmployeeDashboardLight />);
    expect(container).toBeDefined();
  });

  test('TC_MAIN_02: Verify core dashboard elements exist safely', () => {
    render(<EmployeeDashboardLight />);
    expect(screen.getByText(/NexusCorp/i)).toBeInTheDocument();
  });
});