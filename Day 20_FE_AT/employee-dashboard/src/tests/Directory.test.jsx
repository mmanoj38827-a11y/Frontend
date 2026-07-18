import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Directory Module Test Cases', () => {
  test('TC_DIR_01: Verify Directory module renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    
    const dirElements = screen.getAllByText(/Directory/i);
    if (dirElements.length > 0) {
      fireEvent.click(dirElements[0]);
    }
    
    expect(screen.getByText(/Employee Directory/i)).toBeInTheDocument();
  });
});