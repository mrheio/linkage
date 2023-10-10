import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { OverlaysProvider, ThemeProvider } from '~/providers';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<NextUIProvider>
			<ThemeProvider>
				<OverlaysProvider>
					<QueryClientProvider client={queryClient}>
						{children}
					</QueryClientProvider>
				</OverlaysProvider>
			</ThemeProvider>
		</NextUIProvider>
	);
};

export default Providers;
