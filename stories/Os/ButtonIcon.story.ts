import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import ButtonIcon from '~/components/Os/ButtonIcon.vue';

const meta: Meta<typeof ButtonIcon> = {
    title: 'Os/Icon Button',
    component: ButtonIcon,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;
// Default story
export const Primary: Story = {

}

