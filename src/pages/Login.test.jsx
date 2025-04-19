// src/pages/Login.test.jsx
/* eslint-disable no-undef */
import React, { useMemo } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from './Login';

/* ------------------------------------------------------------------
   Mock react-toastify
------------------------------------------------------------------- */
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
    ToastContainer: () => null,
}));

/* ------------------------------------------------------------------
   Mock react-router-dom's useNavigate
------------------------------------------------------------------- */
let mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

/* ------------------------------------------------------------------
   Stub out logo import
------------------------------------------------------------------- */
jest.mock('../assets/logo.png', () => 'logo.png');

describe('Login Page', () => {
    beforeEach(() => {
        mockNavigate.mockReset();
        localStorage.clear();
        jest.clearAllMocks();
    });

    const renderLogin = () =>
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

    test('email input is autofocused on mount', () => {
        renderLogin();
        expect(screen.getByLabelText(/email address/i)).toHaveFocus();
    });

    test('submitting empty form shows validation error and focuses email', async () => {
        renderLogin();
        fireEvent.submit(screen.getByTestId('login-form'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                'Please fill in all fields',
                expect.any(Object)
            );
            expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
            expect(screen.getByLabelText(/email address/i)).toHaveFocus();
        });
    });

    test('invalid credentials show error', async () => {
        localStorage.setItem(
            'users',
            JSON.stringify([{ id: 1, email: 'user@example.com', password: 'pass' }])
        );
        renderLogin();

        await userEvent.type(screen.getByLabelText(/email address/i), 'wrong@example.com');
        await userEvent.type(screen.getByLabelText(/^password$/i), 'pass');
        await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                'Invalid email or password',
                expect.any(Object)
            );
            expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
        });
    });

    test('valid login navigates to dashboard', async () => {
        localStorage.setItem(
            'users',
            JSON.stringify([{ id: 1, email: 'good@example.com', password: 'secret' }])
        );
        renderLogin();

        await userEvent.type(screen.getByLabelText(/email address/i), 'good@example.com');
        await userEvent.type(screen.getByLabelText(/^password$/i), 'secret');
        await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

        expect(toast.success).toHaveBeenCalledWith(
            'Login successful!',
            expect.any(Object)
        );

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    test('password visibility toggle works', async () => {
        renderLogin();
        const pwdInput = screen.getByLabelText(/^password$/i);
        const toggle = screen.getByRole('button', { name: /show password/i });

        expect(pwdInput).toHaveAttribute('type', 'password');
        await userEvent.click(toggle);
        expect(pwdInput).toHaveAttribute('type', 'text');
        expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
        await userEvent.click(screen.getByRole('button', { name: /hide password/i }));
        expect(pwdInput).toHaveAttribute('type', 'password');
    });

    test('keyboard navigation order is correct', async () => {
        const user = userEvent.setup();
        renderLogin();

        const order = [
            screen.getByLabelText(/email address/i),
            screen.getByLabelText(/^password$/i),
            screen.getByRole('button', { name: /show password/i }),
            screen.getByRole('button', { name: /sign in/i }),
            screen.getByRole('link', { name: /register/i }),
        ];

        for (const el of order) {
            expect(el).toHaveFocus();
            await user.tab();
        }
    });
});
