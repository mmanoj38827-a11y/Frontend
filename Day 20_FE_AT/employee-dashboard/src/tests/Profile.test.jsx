import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Profile Module Test Cases', () => {
  test('TC_PROF_01: Verify Profile renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    const elements = screen.getAllByText(/Profile/i);
    if (elements.length > 0) fireEvent.click(elements[0]);
    expect(screen.getByText(/Profile Settings/i)).toBeInTheDocument();
  });
});