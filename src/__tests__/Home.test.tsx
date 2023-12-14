import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Home from '../components/Home/Home';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
 ...jest.requireActual('react-router-dom'),
 useNavigate: jest.fn(),
}));

describe('Home', () => {
 const navigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(navigate);

 it('renders correctly', () => {
   render(<Home />);
   expect(screen.getByText('General Knowledge Quiz')).toBeInTheDocument();
   expect(screen.getByText('Rules')).toBeInTheDocument();
   expect(screen.getByText('1. There are 20 multiple choice questions')).toBeInTheDocument();
   expect(screen.getByText('Lets Play')).toBeInTheDocument();
 });

 it('calls navigate on button click', () => {
   render(<Home />);
   fireEvent.click(screen.getByText('Lets Play'));
   expect(navigate).toHaveBeenCalledWith('/quiz');
 });
});
