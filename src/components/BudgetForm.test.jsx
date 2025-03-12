import { render, screen, fireEvent } from '@testing-library/react';
import BudgetForm from './BudgetForm';
import { useBudgetStore } from '../store/budgetStore';
import { vi } from 'vitest';

vi.mock('../store/budgetStore', () => ({
  useBudgetStore: () => ({
    setBudget: vi.fn(),
  }),
}));

test('sets budget', () => {
  render(<BudgetForm />);
  const input = screen.getByPlaceholderText('Set Monthly Budget');
  const button = screen.getByText('Set');

  fireEvent.change(input, { target: { value: '1500' } });
  fireEvent.click(button);

  expect(input.value).toBe('');
});