import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "../ErrorBoundary";
import { BrowserRouter } from "../../utils/routes";

export type ProvidersProps = {
    children: React.ReactNode; // This is where you define the type for children
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <HelmetProvider>
                    {children}
                </HelmetProvider>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Providers;
