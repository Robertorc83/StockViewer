import { Meta, StoryObj } from '@storybook/react';
import Navbar from './Navbar';
import { Provider } from 'react-redux';
import store  from '@/redux/store';

const meta: Meta = {
    title: 'Base-Components/Navbar',
    component: Navbar,
    decorators: [(Story) => <Provider store={store}><Story/></Provider>], // This wraps component's story in the Redux Provider
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {}; 