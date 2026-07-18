import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('IT Assets Module Test Cases', () => {
  test('TC_ASSET_01: Verify IT Assets renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    const elements = screen.getAllByText(/IT Assets/i);
    if (elements.length > 0) fireEvent.click(elements[0]);
    expect(screen.getByText(/IT Asset Tracking/i)).toBeInTheDocument();
  });
});