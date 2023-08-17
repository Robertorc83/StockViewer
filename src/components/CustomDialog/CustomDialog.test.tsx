import { render, screen, act, waitFor  } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CustomDialog, { dialogOpenSubject$, dialogCloseSubject$ } from './CustomDialog';

describe('CustomDialog component', () => {
  afterEach(() => {
    // Cleanup after each test
    act(() => {
      dialogOpenSubject$.setSubject = false;
      dialogCloseSubject$.setSubject = false;
    });
  });

  it('renders the CustomDialog component with the provided children', () => {
    render(<CustomDialog><span>Test Content</span></CustomDialog>);
    // At this point, the dialog is closed, so we shouldn't find the content
    const contentElement = screen.queryByText('Test Content');
    expect(contentElement).not.toBeInTheDocument();
  });

  it('opens the dialog when dialogOpenSubject$ is triggered', () => {
    render(<CustomDialog><span>Test Content</span></CustomDialog>);
    
    act(() => {
      dialogOpenSubject$.setSubject = true;
    });
    
    const contentElement = screen.getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });

  it('closes the dialog when dialogCloseSubject$ is triggered', async () => {
    render(<CustomDialog><span>Test Content</span></CustomDialog>);

    // Open the dialog first
    act(() => {
      dialogOpenSubject$.setSubject = true;
    });

    // Close the dialog
    act(() => {
      dialogCloseSubject$.setSubject = true;
    });

    await waitFor(() => {
      const contentElement = screen.queryByText('Test Content');
      expect(contentElement).not.toBeInTheDocument();
    });
  });

  it('closes the dialog when dialogCloseSubject$ is triggered', async () => {
    render(<CustomDialog><span>Test Content</span></CustomDialog>);
  
    act(() => {
      dialogOpenSubject$.next(true);  // Use next method here
    });
  
    act(() => {
      dialogCloseSubject$.next(true);  // Use next method here
    });
  
    await waitFor(() => {
      const contentElement = screen.queryByText('Test Content');
      expect(contentElement).not.toBeInTheDocument();
    });
  });
});