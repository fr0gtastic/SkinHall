import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('renders a basic element', () => {
    render(<div>SkinHall</div>);
    expect(screen.getByText('SkinHall')).toBeInTheDocument();
  });
});
