import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Training Module Test Cases', () => {
  test('TC_TRAIN_01: Verify Training module renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    
    // getAllByText use panrathnala multiple matches crash aagathu
    const trainingElements = screen.getAllByText(/Training/i);
    if (trainingElements.length > 0) {
      fireEvent.click(trainingElements[0]);
    }
    
    expect(screen.getByText(/Onboarding & Training/i)).toBeInTheDocument();
  });
});