import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Security Module Test Cases', () => {
  test('TC_SEC_01: Verify Security renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    const elements = screen.getAllByText(/Security/i);
    if (elements.length > 0) fireEvent.click(elements[0]);
    expect(screen.getByText(/System Access & Security/i)).toBeInTheDocument();
  });
});