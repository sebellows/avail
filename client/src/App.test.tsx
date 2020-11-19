import React from 'react';
import { render } from '@testing-library/react';
import App from './containers/App/App';

test('renders learn react link', () => {
    const { getByText } = render(<App />);
    const h1Element = getByText(/avail/i);
    expect(h1Element).toBeInTheDocument();
});
