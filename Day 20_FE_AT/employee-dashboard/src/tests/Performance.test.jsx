import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Performance Module Test Cases', () => {
  test('TC_PERF_01: Verify Performance module renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    
    const perfElements = screen.getAllByText(/Performance/i);
    if (perfElements.length > 0) {
      fireEvent.click(perfElements[0]);
    }
    
    expect(screen.getByText(/Performance Appraisal/i)).toBeInTheDocument();
  });
});