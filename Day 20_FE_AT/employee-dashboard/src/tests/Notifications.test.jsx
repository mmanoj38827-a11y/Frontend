import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeDashboardLight from '../EmployeeDashboardLight';

describe('Notifications Module Test Cases', () => {
  test('TC_NOTIF_01: Verify Notifications renders and interacts safely', () => {
    render(<EmployeeDashboardLight />);
    const elements = screen.getAllByText(/Notifications/i);
    if (elements.length > 0) fireEvent.click(elements[0]);
    expect(screen.getByText(/Notifications & Alerts/i)).toBeInTheDocument();
  });
});