import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ThemeProvider } from '~/providers';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<NextUIProvider className="h-full">
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</ThemeProvider>
		</NextUIProvider>
	);
};

export default Providers;
